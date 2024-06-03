import { IMiddlewareDependencies } from "../middleware";

export interface IBaseHandler {
  dependencies: IMiddlewareDependencies;
} 