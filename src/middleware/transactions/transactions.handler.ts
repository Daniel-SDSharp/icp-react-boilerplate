// TODO: ADD TSDocs
import { GetListTransactionHandler } from "hpl-middleware-wallet/src";
import { IGetTransaction } from "./types";
import { jsonStringify } from "hpl-middleware-wallet/src/repositories/base/baseDataStorage";

export const getTransactionsHandler = async ({ dependencies, assetAddress }: IGetTransaction) => {

  const getListTransactionHandler = new GetListTransactionHandler(dependencies.transactionManagerConfiguration, dependencies.transactionRepository, dependencies.assetRepository);

  const result = await getListTransactionHandler.handle({
    assetAddress: assetAddress
  });

  console.log(jsonStringify(result));
}