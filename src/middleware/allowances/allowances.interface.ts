import { SupportedStandardEnum } from "hpl-middleware-wallet/src/core/types/enums";
import { IBaseHandler } from "../../types/common";

/**
 * Interface for getting a transaction.
 */
export interface IGetTransaction extends IBaseHandler {
  assetAddress: string;
}

/**
 * Interface for adding an allowance.
 */
export interface IAddAllowance extends IBaseHandler {
  assetAddress: string;
  subAccountId: string;
  spenderPrincipal: string;
  amount: number;
  decimal: number;
  expiration?: string | undefined;
  isNoExpiration: boolean;
  supportedStandards: SupportedStandardEnum[];
}

/**
 * Interface for checking an allowance.
 */
export interface ICheckAllowance extends IBaseHandler {
  assetAddress: string;
  subAccountId: string;
  spenderPrincipal: string;
  decimal: number;
}

/**
 * Interface for getting a list of allowances.
 */
export interface IGetListAllowance extends IBaseHandler {
  assetAddress: string;
}

/**
 * Interface for removing an allowance.
 */
export interface IRemoveAllowance extends IBaseHandler {
  assetAddress: string;
  subAccountId: string;
  spenderPrincipal: string;
}

/**
 * Interface for transferring from an allowance.
 */
export interface ITransferFromAllowance extends IBaseHandler {
  receiverPrincipal: string;
  assetAddress: string;
  transferAmount: number;
  decimal: number;
  fromSubAccountId: string;
  toSubAccountId: string;
  senderPrincipal: string;
  transactionFee: number;
}

/**
 * Interface for updating an allowance.
 */
export interface IUpdateAllowance extends IBaseHandler {
  id: string;
  assetAddress: string;
  subAccountId: string;
  spenderPrincipal: string;
  amount: number;
  decimal: number;
  expiration?: number | undefined;
  isNoExpiration: boolean;
  supportedStandards: SupportedStandardEnum[];
}
