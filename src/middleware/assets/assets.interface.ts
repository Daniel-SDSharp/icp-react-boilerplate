import { IBaseHandler } from "../../types/common";

/**
 * Interface for getting assets handler.
 */
export interface IGetAssetsHandler extends IBaseHandler { }

/**
 * Interface for adding an asset.
 */
export interface IAddAsset extends IBaseHandler {
  contractAddress: string;
}

/**
 * Interface for removing an asset.
 */
export interface IRemoveAsset extends IBaseHandler {
  address: string;
}

/**
 * Interface for updating an asset.
 */
export interface IUpdateAsset extends IBaseHandler {
  address: string;
  name: string;
  shortDecimal: number;
  symbol: string;
}
