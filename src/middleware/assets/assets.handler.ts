// TODO: ADD TSDocs
import { UpdateAssetHandler } from "hpl-middleware-wallet/src/core/assetHandlers/update.asset.handler";
import { AddAssetHandler } from "hpl-middleware-wallet/src/core/assetHandlers/add.asset.handler";
import { RemoveAssetHandler } from "hpl-middleware-wallet/src/core/assetHandlers/remove.asset.handler";
import { GetListAssetHandler } from "hpl-middleware-wallet/src/core/assetHandlers/get.list.asset.handler";
import { IAddAsset, IGetAssetsHandler, IRemoveAsset, IUpdateAsset } from "./assets.interface";
import { AssetMetaDataHandler } from "hpl-middleware-wallet/src/core/icrcCacheDataHandlers/asset.metaData.handler";
import { AssetTransactionFeeHandler } from "hpl-middleware-wallet/src/core/icrcCacheDataHandlers/asset.transactionFee.handler";
import { SubAccountBalanceHandler } from "hpl-middleware-wallet/src/core/icrcCacheDataHandlers/subAccount.balance.handler";
import { LoadAssetHandler } from "hpl-middleware-wallet/src/core/internalHandlers/load.asset.handler";
import { jsonStringify } from "hpl-middleware-wallet/src/repositories/base/baseDataStorage";

export const getAssetsHandler = async ({ dependencies }: IGetAssetsHandler) => {

  const assetMetaDataHandler = new AssetMetaDataHandler(dependencies.identifierService, dependencies.localCache);
  const assetTransactionFeeHandler = new AssetTransactionFeeHandler(dependencies.identifierService, dependencies.localCache);
  const subAccountBalanceHandler = new SubAccountBalanceHandler(dependencies.identifierService, dependencies.localCache);
  const loadAssetHandler = new LoadAssetHandler(dependencies.assetManagerConfiguration, assetMetaDataHandler, assetTransactionFeeHandler, subAccountBalanceHandler);

  const getListAssetHandler = new GetListAssetHandler(dependencies.assetRepository, loadAssetHandler, dependencies.assetManagerConfiguration);

  const result = await getListAssetHandler.handle({
    force: false
  });

  let marketList = result.data?.assets.map((a: any) => {

    return {
      ...a,
      logo: ""
    };
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}


export const addAssets = async ({ dependencies, contractAddress }: IAddAsset) => {

  const loadAssetHandler = new LoadAssetHandler(dependencies.assetManagerConfiguration,
    new AssetMetaDataHandler(dependencies.identifierService, dependencies.localCache),
    new AssetTransactionFeeHandler(dependencies.identifierService, dependencies.localCache),
    new SubAccountBalanceHandler(dependencies.identifierService, dependencies.localCache)
  );

  const handler = new AddAssetHandler(dependencies.assetManagerConfiguration, dependencies.assetRepository, loadAssetHandler);

  let assets = await dependencies.assetRepository.getDefaultICRC1systemAssets();

  let asset = assets.find((a: any) => a.contractAddress == contractAddress);

  if (!asset) {
    console.log("Asset not found.");
    return;
  }

  const result = await handler.handle({
    contractAddress: asset.contractAddress,
    indexAddress: asset.indexAddress,
    name: asset.name,
    subAccountIds: ["0x0"],
    symbol: asset.symbol
  });

  await dependencies.assetDataStorage.syncDb();

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

export const removeAssets = async ({ dependencies, address }: IRemoveAsset) => {

  const handler = new RemoveAssetHandler(dependencies.assetRepository, dependencies.contactRepository, dependencies.localCache);

  const result = await handler.handle({ address: address });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

export const updateAssets = async ({ dependencies, address, name, shortDecimal, symbol }: IUpdateAsset) => {

  const handler = new UpdateAssetHandler(dependencies.assetRepository);

  const result = await handler.handle(
    {
      contractAddress: address,
      assetName: name,
      shortDecimal: shortDecimal,
      symbol: symbol
    });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}