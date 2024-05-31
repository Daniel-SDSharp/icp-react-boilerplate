export const idlFactory = ({ IDL }) => {
  const AssetDocument = IDL.Record({
    'id' : IDL.Text,
    'deleted' : IDL.Bool,
    'updatedAt' : IDL.Nat32,
    'payload' : IDL.Text,
  });
  const ContactDocument = IDL.Record({
    'id' : IDL.Text,
    'deleted' : IDL.Bool,
    'updatedAt' : IDL.Nat32,
    'payload' : IDL.Text,
  });
  const WalletDatabase = IDL.Service({
    'doesStorageExist' : IDL.Func([], [IDL.Bool], ['query']),
    'dump' : IDL.Func(
        [],
        [
          IDL.Vec(
            IDL.Tuple(
              IDL.Principal,
              IDL.Tuple(
                IDL.Vec(IDL.Opt(AssetDocument)),
                IDL.Vec(IDL.Opt(ContactDocument)),
              ),
            )
          ),
        ],
        ['query'],
      ),
    'pullAssets' : IDL.Func(
        [IDL.Nat32, IDL.Opt(IDL.Text), IDL.Nat],
        [IDL.Vec(AssetDocument)],
        ['query'],
      ),
    'pullContacts' : IDL.Func(
        [IDL.Nat32, IDL.Opt(IDL.Text), IDL.Nat],
        [IDL.Vec(ContactDocument)],
        ['query'],
      ),
    'pushAssets' : IDL.Func(
        [IDL.Vec(AssetDocument)],
        [IDL.Vec(AssetDocument)],
        [],
      ),
    'pushContacts' : IDL.Func(
        [IDL.Vec(ContactDocument)],
        [IDL.Vec(ContactDocument)],
        [],
      ),
  });
  return WalletDatabase;
};
export const init = ({ IDL }) => { return []; };
