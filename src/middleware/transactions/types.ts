import { IMiddlewareDependencies } from "..";

export interface IGetTransaction {
  dependencies: IMiddlewareDependencies;
  assetAddress: string;
}