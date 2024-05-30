import AssocList "mo:base/AssocList";
import Debug "mo:base/Debug";
import Iter "mo:base/Iter";
import List "mo:base/List";
import Principal "mo:base/Principal";
import Text "mo:base/Text";
import Nat32 "mo:base/Nat32";
import Bool "mo:base/Bool";
import Vector "mo:vector";

import DB "db";

actor class WalletDatabase() {

  type StableStorage<Asset, Contact> = AssocList.AssocList<Principal, (DB.DbInit<Asset, Text>, DB.DbInit<Contact, Text>)>;
  type AssetDocument_v0 = {
    id: Text;
    updatedAt: Nat32;
    deleted: Bool;
    payload: Text;
  };
  type ContactDocument_v0 = {
    id: Text;
    updatedAt: Nat32;
    deleted: Bool;
    payload: Text;
  };

  stable var storage_v0 : StableStorage<AssetDocument_v0, ContactDocument_v0> = null;
  // example how to migrate schema to next version. Uncomment, implement cast functions, replace types below and use new stable var storage_vX everywhere instead of old storage_v0.
  // after initial upgrade v0 stable variable can be deleted
  // Note that it was written before refactoring primary keys, so should be updated accordingly
  // stable var storage_v1 : StableStorage<TokenDocument_v1, ContactDocument_v1> = (
  //   func migrateV1() : StableStorage<TokenDocument_v1, ContactDocument_v1> {
  //     let castToken = func(item : TokenDocument_v0) : TokenDocument_v1 = item;
  //     let castContact = func(item : ContactDocument_v0) : ContactDocument_v1 = item;
  //     let res = List.map<(Principal, (DB.DbInit<TokenDocument_v1>, DB.DbInit<ContactDocument_v1>)), (Principal, (DB.DbInit<TokenDocument_v1>, DB.DbInit<ContactDocument_v1>))>(
  //       storage_v0,
  //       func((p, (x, y))) = (p, (DB.migrate(x, castToken), DB.migrate(y, castContact))),
  //     );
  //     storage_v0 := null;
  //     res;
  //   }
  // )();

  // update these when migrating database
  type AssetDocument = AssetDocument_v0;
  type ContactDocument = ContactDocument_v0;

  var databasesCache : AssocList.AssocList<Principal, (DB.DbUse<AssetDocument, Text>, DB.DbUse<ContactDocument, Text>)> = null;

  private func getDatabase(owner : Principal, notFoundStrategy : { #create; #returnNull }) : ?(DB.DbUse<AssetDocument, Text>, DB.DbUse<ContactDocument, Text>) {
    switch (AssocList.find(databasesCache, owner, Principal.equal)) {
      case (?db) ?db;
      case (null) {
        let (tInit, cInit) = switch (AssocList.find(storage_v0, owner, Principal.equal)) {
          case (?store) store;
          case (null) {
            switch (notFoundStrategy) {
              case (#returnNull) return null;
              case (#create) {
                let store = (DB.empty<AssetDocument, Text>(), DB.empty<ContactDocument, Text>());
                let (upd, _) = AssocList.replace(storage_v0, owner, Principal.equal, ?store);
                storage_v0 := upd;
                store;
              };
            };
          };
        };
        let db = (
          DB.use<AssetDocument, Text>(tInit, func(x) = x.id, Text.compare, func(x) = x.updatedAt),
          DB.use<ContactDocument, Text>(cInit, func(x) = x.id, Text.compare, func(x) = x.updatedAt),
        );
        let (upd, _) = AssocList.replace(databasesCache, owner, Principal.equal, ?db);
        databasesCache := upd;
        ?db;
      };
    };
  };

  public shared ({ caller }) func pushAssets(docs : [AssetDocument]) : async [AssetDocument] {
    let ?(tdb, _) = getDatabase(caller, #create) else Debug.trap("Can never happen");
    DB.pushUpdates(tdb, docs);
  };

  public shared ({ caller }) func pushContacts(docs : [ContactDocument]) : async [ContactDocument] {
    let ?(_, cdb) = getDatabase(caller, #create) else Debug.trap("Can never happen");
    DB.pushUpdates(cdb, docs);
  };

  public shared query ({ caller }) func pullAssets(updatedAt : Nat32, lastId : ?Text, limit : Nat) : async [AssetDocument] {
    switch (getDatabase(caller, #returnNull)) {
      case (?(tdb, _)) DB.getLatest(tdb, updatedAt, lastId, limit);
      case (null) [];
    };
  };

  public shared query ({ caller }) func pullContacts(updatedAt : Nat32, lastId : ?Text, limit : Nat) : async [ContactDocument] {
    switch (getDatabase(caller, #returnNull)) {
      case (?(_, cdb)) DB.getLatest(cdb, updatedAt, lastId, limit);
      case (null) [];
    };
  };

  public shared query ({ caller }) func dump() : async [(Principal, ([?AssetDocument], [?ContactDocument]))] {
    Iter.toArray<(Principal, ([?AssetDocument], [?ContactDocument]))>(
      Iter.map<(Principal, (DB.DbInit<AssetDocument, Text>, DB.DbInit<ContactDocument, Text>)), (Principal, ([?AssetDocument], [?ContactDocument]))>(
        List.toIter(storage_v0),
        func((p, (t, c))) = (p, (Vector.toArray<?AssetDocument>(t.db.vec), Vector.toArray<?ContactDocument>(c.db.vec))),
      )
    );
  };

  public shared query ({ caller }) func doesStorageExist() : async Bool {
    switch (AssocList.find(databasesCache, caller, Principal.equal)) {
      case (?db) true;
      case (null) false;
    };
  };

};
