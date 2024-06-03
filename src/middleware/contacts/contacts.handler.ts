// ! TODO (middleware): Would be great if these packages were exported from a single module (contactHandlers) 
import { GetListContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/get.list.contact.handler"
import { AddContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/add.contact.handler"
import { RemoveContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/remove.contact.handler"
import { EditContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/edit.contact.handler"
import { RemoveAssetContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/remove.asset.contact.handler"
import { AddAssetContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/add.asset.contact.handler"
import { RemoveSubAccountContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/remove.subaccount.contact.handler"

import { jsonStringify } from "hpl-middleware-wallet/src/repositories/base/baseDataStorage";
import { IMiddlewareDependencies } from "..";
import { IAddAssetToContact, IAddContact, IEditContact, IRemoveAssetFromContact, IRemoveContact, IRemoveSubAccountFromContact } from "./contacts.interface"

/**
 * Gets contact list
 * @param dependencies middleware dependencies 
 */
export const getContactsHandler = async (dependencies: IMiddlewareDependencies) => {
  const getListContactHandler = new GetListContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository, dependencies.assetRepository, dependencies.allowanceRepository);

  const result = await getListContactHandler.handle({
    force: false
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }

}

/**
 * Adds Contact 
 * @param dependencies  
 * @param principal  
 * @param assetAddress  
 * @param contactName  
 * @param subAccountIndex  
 * @param subAccountName  
 */
export const addContactHandler = async ({ dependencies, principal, assetAddress, contactName, subAccountIndex, subAccountName }: IAddContact) => {
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
  }]
    : []
  const result = await handler.handle({
    principal: principal,
    name: contactName,
    assets: assets
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

/**
 * Updates Contact  
 * @param dependencies  
 * @param principal  
 * @param contactName  
 */
export const editContactHandler = async ({ dependencies, principal, contactName }: IEditContact) => {
  const handler = new EditContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    name: contactName,
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

/**
 * Removes Contact  
 * @param dependencies  
 * @param principal  
 */
export const removeContactHandler = async ({ dependencies, principal }: IRemoveContact) => {
  const handler = new RemoveContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}


/**
 * Removes asset from contact  
 * @param dependencies  
 * @param principal  
 * @param assetAddress 
 */
export const removeAssetFromContactHandler = async ({ dependencies, principal, assetAddress }: IRemoveAssetFromContact) => {

  const handler = new RemoveAssetContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    assetAddress: assetAddress
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

/**
 * Adds asset to contact  
 * @param dependencies  
 * @param principal  
 * @param assetAddress 
 */
export const addAssetToContactHandler = async ({ dependencies, principal, assetAddress }: IAddAssetToContact) => {

  const handler = new AddAssetContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    assetAddress: assetAddress
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}

/**
 * Removes sub account from contact 
 * @param dependencies  
 * @param principal  
 * @param assetAddress 
 * @param subAccountIndex 
 */
export const removeSubAccountFromContactHandler = async ({ dependencies, principal, assetAddress, subAccountIndex }: IRemoveSubAccountFromContact) => {

  const handler = new RemoveSubAccountContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    assetAddress: assetAddress,
    subAccountIndex: subAccountIndex
  });

  if (result.isSucess) {
    console.log(jsonStringify(result));
  }
  else {
    console.log(jsonStringify(result));
  }
}