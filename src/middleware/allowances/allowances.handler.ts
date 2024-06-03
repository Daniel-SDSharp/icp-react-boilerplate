import { AddAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/add.allowance.handler"
import { CheckAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/check.allowance.handler"
import { GetListAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/get.list.allowance.handler"
import { RemoveAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/remove.allowance.handler"
import { TransferFromAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/transfer.from.allowance.handler"
import { UpdateAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/update.allowance.handler"
import { IAddAllowance, ICheckAllowance, IGetListAllowance, IRemoveAllowance, ITransferFromAllowance, IUpdateAllowance } from "./allowances.interface"
import { jsonStringify } from "hpl-middleware-wallet/src/repositories/base/baseDataStorage"

export const addAllowanceHandler = async ({ dependencies, assetAddress, subAccountId, spenderPrincipal, amount, decimal, expiration, isNoExpiration, supportedStandards }: IAddAllowance) => {
  const handler = new AddAllowanceHandler(dependencies.assetManagerConfiguration, dependencies.allowanceRepository)

  const result = await handler.handle({
    assetAddress, subAccountId, spenderPrincipal, amount, decimal, expiration, isNoExpiration, supportedStandards
  })

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

export const checkAllowanceHandler = async ({ dependencies, assetAddress, subAccountId, spenderPrincipal, decimal }: ICheckAllowance) => {
  const handler = new CheckAllowanceHandler(dependencies.allowanceRepository)

  const result = await handler.handle({
    assetAddress, subAccountId, spenderPrincipal, decimal
  })

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

export const getListAllowanceHandler = async ({ dependencies, assetAddress }: IGetListAllowance) => {
  const handler = new GetListAllowanceHandler(dependencies.assetManagerConfiguration, dependencies.allowanceRepository, dependencies.assetRepository)

  const result = await handler.handle({
    assetAddress,
  })

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

export const removeAllowanceHandler = async ({ dependencies,
  assetAddress,
  subAccountId,
  spenderPrincipal,
}: IRemoveAllowance) => {
  const handler = new RemoveAllowanceHandler(dependencies.assetManagerConfiguration, dependencies.allowanceRepository);

  const result = await handler.handle({
    assetAddress,
    subAccountId,
    spenderPrincipal,
  })

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

export const transferFromAllowanceHandler = async ({ dependencies, receiverPrincipal, assetAddress, transferAmount, decimal, fromSubAccountId, toSubAccountId, senderPrincipal, transactionFee }: ITransferFromAllowance) => {
  const handler = new TransferFromAllowanceHandler(dependencies.allowanceRepository);

  const result = await handler.handle({
    receiverPrincipal, assetAddress, transferAmount, decimal, fromSubAccountId, toSubAccountId, senderPrincipal, transactionFee
  })

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

export const updateAllowanceHandler = async ({ dependencies, id, assetAddress, subAccountId, spenderPrincipal, amount, decimal, expiration, isNoExpiration, supportedStandards }: IUpdateAllowance) => {
  const handler = new UpdateAllowanceHandler(dependencies.assetManagerConfiguration, dependencies.allowanceRepository);

  const result = await handler.handle({
    id, assetAddress, subAccountId, spenderPrincipal, amount, decimal, expiration, isNoExpiration, supportedStandards
  })

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}