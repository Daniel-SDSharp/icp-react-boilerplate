import { IMiddlewareDependencies } from ".."

export interface IGetAssetsHandler {
  dependencies: IMiddlewareDependencies;
}

export interface IAddAsset {
  dependencies: IMiddlewareDependencies;
  contractAddress: string;
}

export interface IRemoveAsset {
  dependencies: IMiddlewareDependencies;
  address: string;
}

export interface IUpdateAsset {
  dependencies: IMiddlewareDependencies;
  address: string;
  name: string;
  shortDecimal: number;
  symbol: string;
}