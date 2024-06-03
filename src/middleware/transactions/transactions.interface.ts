import { Principal } from "@dfinity/principal";
import { IMiddlewareDependencies } from "..";
import { IBaseHandler } from "../../types/common";

export interface IGetTransaction extends IBaseHandler {
  assetAddress: string;
}

export interface ISendTransaction extends IBaseHandler {
  amount: string;
  assetAddress: string;
  indexAddress: string;
  subAccountId: string;
  receiverAccountPrincipal: Principal;
  receiverSubAccountId: string;
}