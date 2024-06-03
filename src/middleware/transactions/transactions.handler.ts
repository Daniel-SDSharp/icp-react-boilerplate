import { GetListTransactionHandler } from "hpl-middleware-wallet/src/core/transactionHandlers/get.list.transaction.handler";
import { SendTransactionHandler } from "hpl-middleware-wallet/src/core/transactionHandlers/send.transaction.handler";
import { jsonStringify } from "hpl-middleware-wallet/src/repositories/base/baseDataStorage";
import { IGetTransaction, ISendTransaction } from "./transactions.interface";
import { AssetMetaDataHandler } from "hpl-middleware-wallet/src/core/icrcCacheDataHandlers/asset.metaData.handler";
import { GetSubAccountByHandler } from "hpl-middleware-wallet/src/core/internalHandlers/get.subAccountBy.handler";
import { SubAccountBalanceHandler } from "hpl-middleware-wallet/src/core/icrcCacheDataHandlers/subAccount.balance.handler";

/**
 * Handles getting a list of transactions.
 * @param {IGetTransaction} params - Parameters for getting a list of transactions.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.assetAddress - Address of the asset.
 */
export const getTransactionsHandler = async ({ dependencies, assetAddress }: IGetTransaction): Promise<void> => {

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

/**
 * Handles sending a transaction.
 * @param {ISendTransaction} params - Parameters for sending a transaction.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {number} params.amount - Amount of the transaction.
 * @param {string} params.assetAddress - Address of the asset.
 * @param {string} params.indexAddress - Index address.
 * @param {string} params.subAccountId - ID of the sub-account.
 * @param {string} params.receiverAccountPrincipal - Principal of the receiver account.
 * @param {string} params.receiverSubAccountId - ID of the receiver sub-account.
 */
export const sendTransactionHandler = async ({ dependencies, amount, assetAddress, indexAddress, subAccountId, receiverAccountPrincipal, receiverSubAccountId }: ISendTransaction): Promise<void> => {
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
