import { IMiddlewareDependencies } from "..";

// TODO: TSDoc 
export interface IAddContact {
  dependencies: IMiddlewareDependencies;
  principal: string;
  contactName: string;
  assetAddress: string;
  subAccountIndex: string;
  subAccountName: string;
}

export interface IRemoveContact {
  dependencies: IMiddlewareDependencies;
  principal: string;
}

export interface IEditContact {
  dependencies: IMiddlewareDependencies;
  principal: string;
  contactName: string;
}

export interface IRemoveContact {
  dependencies: IMiddlewareDependencies;
  principal: string;
}

export interface IAddAssetToContact {
  dependencies: IMiddlewareDependencies;
  principal: string;
  assetAddress: string;
}

export interface IRemoveAssetFromContact {
  dependencies: IMiddlewareDependencies;
  principal: string;
  assetAddress: string;
}

export interface IRemoveSubAccountFromContact {
  dependencies: IMiddlewareDependencies;
  principal: string;
  assetAddress: string;
  subAccountIndex: string;
}