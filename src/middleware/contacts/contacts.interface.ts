import { IBaseHandler } from "../../types/common";

export interface IAddContact extends IBaseHandler {
  principal: string;
  contactName: string;
  assetAddress: string;
  subAccountIndex: string;
  subAccountName: string;
}

export interface IRemoveContact extends IBaseHandler {
  principal: string;
}

export interface IEditContact extends IBaseHandler {
  principal: string;
  contactName: string;
}

export interface IRemoveContact extends IBaseHandler {
  principal: string;
}

export interface IAddAssetToContact extends IBaseHandler {
  principal: string;
  assetAddress: string;
}

export interface IRemoveAssetFromContact extends IBaseHandler {
  principal: string;
  assetAddress: string;
}

export interface IRemoveSubAccountFromContact extends IBaseHandler {
  principal: string;
  assetAddress: string;
  subAccountIndex: string;
}
