import { GetListTransactionHandler } from "hpl-middleware-wallet/src/core/transactionHandlers/get.list.transaction.handler";
import { SendTransactionHandler } from "hpl-middleware-wallet/src/core/transactionHandlers/send.transaction.handler";
import { jsonStringify } from "hpl-middleware-wallet/src/repositories/base/baseDataStorage";
import { IGetTransaction, ISendTransaction } from "./transactions.interface";
import { AssetMetaDataHandler } from "hpl-middleware-wallet/src/core/icrcCacheDataHandlers/asset.metaData.handler";
import { GetSubAccountByHandler } from "hpl-middleware-wallet/src/core/internalHandlers/get.subAccountBy.handler";
import { SubAccountBalanceHandler } from "hpl-middleware-wallet/src/core/icrcCacheDataHandlers/subAccount.balance.handler";

export const getTransactionsHandler = async ({ dependencies, assetAddress }: IGetTransaction) => {

  const getListTransactionHandler = new GetListTransactionHandler(dependencies.transactionManagerConfiguration, dependencies.transactionRepository, dependencies.assetRepository);

  const result = await getListTransactionHandler.handle({
    assetAddress: assetAddress
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

export const sendTransactionHandler = async ({ dependencies, amount, assetAddress, indexAddress, subAccountId, receiverAccountPrincipal, receiverSubAccountId }: ISendTransaction) => {
  const subAccountBalanceHandler = new SubAccountBalanceHandler(dependencies.identifierService, dependencies.localCache)
  const assetMetaDataHandler = new AssetMetaDataHandler(dependencies.identifierService, dependencies.localCache)
  const getSubAccountByHandler = new GetSubAccountByHandler(dependencies.assetManagerConfiguration, assetMetaDataHandler, subAccountBalanceHandler)
  const sendTransactionHandler = new SendTransactionHandler(assetMetaDataHandler, dependencies.identifierService, getSubAccountByHandler);

  const result = await sendTransactionHandler.handle({
    amount, assetAddress, indexAddress, subAccountId, receiverAccountPrincipal, receiverSubAccountId
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}