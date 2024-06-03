import { IBaseHandler } from "../../types/common";

/**
 * Interface for adding a contact.
 */
export interface IAddContact extends IBaseHandler {
  principal: string;
  contactName: string;
  assetAddress: string;
  subAccountIndex: string;
  subAccountName: string;
}

/**
 * Interface for removing a contact.
 */
export interface IRemoveContact extends IBaseHandler {
  principal: string;
}

/**
 * Interface for editing a contact.
 */
export interface IEditContact extends IBaseHandler {
  principal: string;
  contactName: string;
}

/**
 * Interface for adding an asset to a contact.
 */
export interface IAddAssetToContact extends IBaseHandler {
  principal: string;
  assetAddress: string;
}

/**
 * Interface for removing an asset from a contact.
 */
export interface IRemoveAssetFromContact extends IBaseHandler {
  principal: string;
  assetAddress: string;
}

/**
 * Interface for removing a sub-account from a contact.
 */
export interface IRemoveSubAccountFromContact extends IBaseHandler {
  principal: string;
  assetAddress: string;
  subAccountIndex: string;
}
