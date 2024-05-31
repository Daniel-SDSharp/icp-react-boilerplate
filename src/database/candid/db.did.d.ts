import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AssetDocument {
  'id' : string,
  'deleted' : boolean,
  'updatedAt' : number,
  'payload' : string,
}
export interface ContactDocument {
  'id' : string,
  'deleted' : boolean,
  'updatedAt' : number,
  'payload' : string,
}
export interface WalletDatabase {
  'doesStorageExist' : ActorMethod<[], boolean>,
  'dump' : ActorMethod<
    [],
    Array<
      [Principal, [Array<[] | [AssetDocument]>, Array<[] | [ContactDocument]>]]
    >
  >,
  'pullAssets' : ActorMethod<
    [number, [] | [string], bigint],
    Array<AssetDocument>
  >,
  'pullContacts' : ActorMethod<
    [number, [] | [string], bigint],
    Array<ContactDocument>
  >,
  'pushAssets' : ActorMethod<[Array<AssetDocument>], Array<AssetDocument>>,
  'pushContacts' : ActorMethod<
    [Array<ContactDocument>],
    Array<ContactDocument>
  >,
}
export interface _SERVICE extends WalletDatabase {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
