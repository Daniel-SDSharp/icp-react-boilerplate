import { AddAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/add.allowance.handler"
import { CheckAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/check.allowance.handler"
import { GetListAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/get.list.allowance.handler"
import { RemoveAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/remove.allowance.handler"
import { TransferFromAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/transfer.from.allowance.handler"
import { UpdateAllowanceHandler } from "hpl-middleware-wallet/src/core/allowanceHandlers/update.allowance.handler"
import { IAddAllowance, ICheckAllowance, IGetListAllowance, IRemoveAllowance, ITransferFromAllowance, IUpdateAllowance } from "./allowances.interface"
import { jsonStringify } from "hpl-middleware-wallet/src/repositories/base/baseDataStorage"

/**
 * Handles adding an allowance.
 * @param {IAddAllowance} params - Parameters for adding an allowance.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.assetAddress - Address of the asset.
 * @param {string} params.subAccountId - ID of the sub-account.
 * @param {string} params.spenderPrincipal - Principal of the spender.
 * @param {number} params.amount - Amount of the allowance.
 * @param {number} params.decimal - Decimal value of the asset.
 * @param {string} [params.expiration] - Expiration date of the allowance.
 * @param {boolean} params.isNoExpiration - Flag indicating whether the allowance has no expiration.
 * @param {SupportedStandardEnum[]} params.supportedStandards - Supported standards for the allowance.
 */
export const addAllowanceHandler = async ({ dependencies, assetAddress, subAccountId, spenderPrincipal, amount, decimal, expiration, isNoExpiration, supportedStandards }: IAddAllowance): Promise<void> => {
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

/**
 * Handles checking an allowance.
 * @param {ICheckAllowance} params - Parameters for checking an allowance.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.assetAddress - Address of the asset.
 * @param {string} params.subAccountId - ID of the sub-account.
 * @param {string} params.spenderPrincipal - Principal of the spender.
 * @param {number} params.decimal - Decimal value of the asset.
 */
export const checkAllowanceHandler = async ({ dependencies, assetAddress, subAccountId, spenderPrincipal, decimal }: ICheckAllowance): Promise<void> => {
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

/**
 * Handles getting a list of allowances.
 * @param {IGetListAllowance} params - Parameters for getting a list of allowances.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.assetAddress - Address of the asset.
 */
export const getListAllowanceHandler = async ({ dependencies, assetAddress }: IGetListAllowance): Promise<void> => {
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

/**
 * Handles removing an allowance.
 * @param {IRemoveAllowance} params - Parameters for removing an allowance.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.assetAddress - Address of the asset.
 * @param {string} params.subAccountId - ID of the sub-account.
 * @param {string} params.spenderPrincipal - Principal of the spender.
 */
export const removeAllowanceHandler = async ({ dependencies, assetAddress, subAccountId, spenderPrincipal }: IRemoveAllowance): Promise<void> => {
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

/**
 * Handles transferring from an allowance.
 * @param {ITransferFromAllowance} params - Parameters for transferring from an allowance.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.receiverPrincipal - Principal of the receiver.
 * @param {string} params.assetAddress - Address of the asset.
 * @param {number} params.transferAmount - Amount to transfer.
 * @param {number} params.decimal - Decimal value of the asset.
 * @param {string} params.fromSubAccountId - ID of the sub-account from which to transfer.
 * @param {string} params.toSubAccountId - ID of the sub-account to which to transfer.
 * @param {string} params.senderPrincipal - Principal of the sender.
 * @param {number} params.transactionFee - Transaction fee.
 */
export const transferFromAllowanceHandler = async ({ dependencies, receiverPrincipal, assetAddress, transferAmount, decimal, fromSubAccountId, toSubAccountId, senderPrincipal, transactionFee }: ITransferFromAllowance): Promise<void> => {
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

/**
 * Handles updating an allowance.
 * @param {IUpdateAllowance} params - Parameters for updating an allowance.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.id - ID of the allowance.
 * @param {string} params.assetAddress - Address of the asset.
 * @param {string} params.subAccountId - ID of the sub-account.
 * @param {string} params.spenderPrincipal - Principal of the spender.
 * @param {number} params.amount - Amount of the allowance.
 * @param {number} params.decimal - Decimal value of the asset.
 * @param {string} [params.expiration] - Expiration date of the allowance.
 * @param {boolean} params.isNoExpiration - Flag indicating whether the allowance has no expiration.
 * @param {SupportedStandardEnum[]} params.supportedStandards - Supported standards for the allowance.
 */
export const updateAllowanceHandler = async ({ dependencies, id, assetAddress, subAccountId, spenderPrincipal, amount, decimal, expiration, isNoExpiration, supportedStandards }: IUpdateAllowance): Promise<void> => {
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
