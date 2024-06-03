//! TODO/SUGGESTION: If possible export these packages from a signle module, so that its possible to import in a single line  
import { GetListContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/get.list.contact.handler";
import { AddContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/add.contact.handler";
import { RemoveContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/remove.contact.handler";
import { EditContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/edit.contact.handler";
import { RemoveAssetContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/remove.asset.contact.handler";
import { AddAssetContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/add.asset.contact.handler";
import { RemoveSubAccountContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/remove.subaccount.contact.handler";

import { jsonStringify } from "hpl-middleware-wallet/src/repositories/base/baseDataStorage";
import { IMiddlewareDependencies } from "..";
import { IAddAssetToContact, IAddContact, IEditContact, IRemoveAssetFromContact, IRemoveContact, IRemoveSubAccountFromContact } from "./contacts.interface";
import { ContactResult, ContactView, GetListContactResult } from "hpl-middleware-wallet/src/core/types/contact.types";
import { FormResult } from "hpl-middleware-wallet/src/utils/forms/formBase";

/**
 * Gets contact list.
 * @param {IMiddlewareDependencies} dependencies - Middleware dependencies.
 * @returns {Promise<ContactView[] | undefined>} A promise that resolves to an array of ContactView or undefined.
 */
export const getContactsHandler = async (dependencies: IMiddlewareDependencies): Promise<ContactView[] | undefined> => {
  const getListContactHandler = new GetListContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository, dependencies.assetRepository, dependencies.allowanceRepository);

  const result = await getListContactHandler.handle({
    force: false
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  } else {
    console.log(jsonStringify(result));
  }

  return result.data?.contacts;
}

/**
 * Adds a contact.
 * @param {IAddContact} params - Parameters for adding a contact.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.principal - Principal of the contact.
 * @param {string} params.assetAddress - Address of the asset.
 * @param {string} params.contactName - Name of the contact.
 * @param {string} params.subAccountIndex - Index of the sub-account.
 * @param {string} params.subAccountName - Name of the sub-account.
 * @returns {Promise<ContactResult | undefined>} A promise that resolves to a ContactResult or undefined.
 */
export const addContactHandler = async ({ dependencies, principal, assetAddress, contactName, subAccountIndex, subAccountName }: IAddContact): Promise<ContactResult | undefined> => {
  const handler = new AddContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const asset = await dependencies.assetRepository.getAssetOrDefault(assetAddress);
  const assets = asset ? [{
    address: asset.contractAddress,
    subAccounts: [
      {
        name: subAccountName,
        subAccountIndex: subAccountIndex
      }
    ]
  }] : [];

  const result = await handler.handle({
    principal: principal,
    name: contactName,
    assets: assets
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  } else {
    console.log(jsonStringify(result));
  }

  return result.data;
}

/**
 * Updates a contact.
 * @param {IEditContact} params - Parameters for editing a contact.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.principal - Principal of the contact.
 * @param {string} params.contactName - Name of the contact.
 * @returns {Promise<FormResult<ContactResult>>} A promise that resolves to a FormResult<ContactResult>.
 */
export const editContactHandler = async ({ dependencies, principal, contactName }: IEditContact): Promise<FormResult<ContactResult>> => {
  const handler = new EditContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    name: contactName,
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  } else {
    console.log(jsonStringify(result));
  }

  return result;
}

/**
 * Removes a contact.
 * @param {IRemoveContact} params - Parameters for removing a contact.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.principal - Principal of the contact.
 * @returns {Promise<FormResult<ContactResult>>} A promise that resolves to a FormResult<ContactResult>.
 */
export const removeContactHandler = async ({ dependencies, principal }: IRemoveContact): Promise<FormResult<ContactResult>> => {
  const handler = new RemoveContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  } else {
    console.log(jsonStringify(result));
  }

  return result;
}

/**
 * Removes an asset from a contact.
 * @param {IRemoveAssetFromContact} params - Parameters for removing an asset from a contact.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.principal - Principal of the contact.
 * @param {string} params.assetAddress - Address of the asset.
 * @returns {Promise<FormResult<ContactResult>>} A promise that resolves to a FormResult<ContactResult>.
 */
export const removeAssetFromContactHandler = async ({ dependencies, principal, assetAddress }: IRemoveAssetFromContact): Promise<FormResult<ContactResult>> => {
  const handler = new RemoveAssetContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    assetAddress: assetAddress
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  } else {
    console.log(jsonStringify(result));
  }

  return result;
}

/**
 * Adds an asset to a contact.
 * @param {IAddAssetToContact} params - Parameters for adding an asset to a contact.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.principal - Principal of the contact.
 * @param {string} params.assetAddress - Address of the asset.
 * @returns {Promise<FormResult<ContactResult>>} A promise that resolves to a FormResult<ContactResult>.
 */
export const addAssetToContactHandler = async ({ dependencies, principal, assetAddress }: IAddAssetToContact): Promise<FormResult<ContactResult>> => {
  const handler = new AddAssetContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    assetAddress: assetAddress
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  } else {
    console.log(jsonStringify(result));
  }

  return result;
}

/**
 * Removes a sub-account from a contact.
 * @param {IRemoveSubAccountFromContact} params - Parameters for removing a sub-account from a contact.
 * @param {IMiddlewareDependencies} params.dependencies - Middleware dependencies.
 * @param {string} params.principal - Principal of the contact.
 * @param {string} params.assetAddress - Address of the asset.
 * @param {string} params.subAccountIndex - Index of the sub-account.
 * @returns {Promise<FormResult<ContactResult>>} A promise that resolves to a FormResult<ContactResult>.
 */
export const removeSubAccountFromContactHandler = async ({ dependencies, principal, assetAddress, subAccountIndex }: IRemoveSubAccountFromContact): Promise<FormResult<ContactResult>> => {
  const handler = new RemoveSubAccountContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    assetAddress: assetAddress,
    subAccountIndex: subAccountIndex
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  } else {
    console.log(jsonStringify(result));
  }

  return result;
}