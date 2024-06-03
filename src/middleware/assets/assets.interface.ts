import { IBaseHandler } from "../../types/common";

export interface IGetAssetsHandler extends IBaseHandler {
}

export interface IAddAsset extends IBaseHandler {
  contractAddress: string;
}

export interface IRemoveAsset extends IBaseHandler {
  address: string;
}

export interface IUpdateAsset extends IBaseHandler {
  address: string;
  name: string;
  shortDecimal: number;
  symbol: string;
}