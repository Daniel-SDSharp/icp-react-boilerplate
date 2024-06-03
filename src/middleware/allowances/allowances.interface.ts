import { SupportedStandardEnum } from "hpl-middleware-wallet/src/core/types/enums";
import { IBaseHandler } from "../../types/common";

export interface IGetTransaction extends IBaseHandler {
  assetAddress: string;
}

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

export interface ICheckAllowance extends IBaseHandler {
  assetAddress: string;
  subAccountId: string;
  spenderPrincipal: string;
  decimal: number;
}

export interface IGetListAllowance extends IBaseHandler {
  assetAddress: string;
}

export interface IRemoveAllowance extends IBaseHandler {
  assetAddress: string;
  subAccountId: string;
  spenderPrincipal: string;
}

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