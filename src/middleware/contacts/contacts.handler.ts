// ! TODO (middleware): These packages should be exported from a single module (contactHandlers) 
import { GetListContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/get.list.contact.handler"
import { AddContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/add.contact.handler"
import { RemoveContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/remove.contact.handler"
import { EditContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/edit.contact.handler"
import { RemoveAssetContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/remove.asset.contact.handler"
import { AddAssetContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/add.asset.contact.handler"
import { RemoveSubAccountContactHandler } from "hpl-middleware-wallet/src/core/contactHandlers/remove.subaccount.contact.handler"

import { jsonStringify } from "hpl-middleware-wallet/src/repositories/base/baseDataStorage";
import { IMiddlewareDependencies } from "..";
import { IAddAssetToContact, IAddContact, IEditContact, IRemoveAssetFromContact, IRemoveContact, IRemoveSubAccountFromContact } from "./types";

// TODO: SET RETURN TYPES
// TODO: TSDoc 

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

  console.log(jsonStringify(result));
}

export const editContactHandler = async ({ dependencies, principal, contactName }: IEditContact) => {
  const handler = new EditContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    name: contactName,
  });

  console.log(jsonStringify(result));
}

export const removeContactHandler = async ({ dependencies, principal }: IRemoveContact) => {
  const handler = new RemoveContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
  });

  console.log(jsonStringify(result));
}

export const removeAssetFromContactHandler = async ({ dependencies, principal, assetAddress }: IRemoveAssetFromContact) => {

  const handler = new RemoveAssetContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    assetAddress: assetAddress
  });

  console.log(jsonStringify(result));
}

export const addAssetToContactHandler = async ({ dependencies, principal, assetAddress }: IAddAssetToContact) => {

  const handler = new AddAssetContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    assetAddress: assetAddress
  });

  console.log(jsonStringify(result));
}

export const removeSubAccountFromContactHandler = async ({ dependencies, principal, assetAddress, subAccountIndex }: IRemoveSubAccountFromContact) => {

  const handler = new RemoveSubAccountContactHandler(dependencies.assetManagerConfiguration, dependencies.contactRepository);

  const result = await handler.handle({
    principal: principal,
    assetAddress: assetAddress,
    subAccountIndex: subAccountIndex
  });

  console.log(jsonStringify(result));
}