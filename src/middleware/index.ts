import { HttpAgent, Identity } from "@dfinity/agent";
import { AssetManager, AssetDataStorage } from "hpl-middleware-wallet/src";
import { ContactDataStorage } from "hpl-middleware-wallet/src/repositories/contactDataStorage";
import { DbContext } from "hpl-middleware-wallet/src/repositories/base/dbContext";
import { getRxStorageMemory } from 'rxdb/plugins/storage-memory';
import { IStorage, LocalCacheRepository } from "hpl-middleware-wallet/src/repositories/localCacheRepository";
import { createActor } from "../database/candid";
import { IdentifierService } from "hpl-middleware-wallet/src/service/identifierService";
import { AssetRepository } from "hpl-middleware-wallet/src/repositories/assetRepository";
import { ContactRepository } from "hpl-middleware-wallet/src/repositories/contactRepository";
import { TransactionRepository } from "hpl-middleware-wallet/src/repositories/transactionRepository";
import { CONFIG } from "./const";
import { AllowanceRepository } from "hpl-middleware-wallet/src/repositories/allowanceRepository";
import { AllowanceDataStorage } from "hpl-middleware-wallet/src/repositories/allowanceDataStorage";
import { AllowanceCacheStorage } from "hpl-middleware-wallet/src/repositories/allowanceCacheStorage";

// Middleware instance initialization 

export interface IAssetManagerConfiguration {
  ethMarketUrl: string,
  tokenMarketUrl: string,
  defaultDateTimeFormat: string
}

export interface ITransactionManagerConfiguration {
  icpUrl: string,
  ogyUrl: string,
  icpNetwork: string,
  ogyNetwork: string,
  icpBlockchain: string,
  ogyBlockchain: string
}

export interface IMiddlewareDependencies {
  allowanceRepository: AllowanceRepository;
  assetManager: AssetManager;
  assetRepository: AssetRepository;
  contactRepository: ContactRepository;
  transactionRepository: TransactionRepository;
  dbContext: DbContext;
  identifierService: IdentifierService;
  localCache: LocalCacheRepository
  assetDataStorage: AssetDataStorage,
  assetManagerConfiguration: IAssetManagerConfiguration,
  transactionManagerConfiguration: ITransactionManagerConfiguration,
}


const assetManagerConfiguration = {
  ethMarketUrl: CONFIG.ETH_MARKET_URL,
  tokenMarketUrl: CONFIG.TOKEN_MARKET_URL,
  defaultDateTimeFormat: "MM/DD/YYYY HH:mm"
}

const transactionManagerConfiguration = {
  icpUrl: CONFIG.ICP_URL,
  ogyUrl: CONFIG.OGY_URL,
  icpNetwork: CONFIG.ICP_NETWORK,
  ogyNetwork: CONFIG.OGY_NETWORK,
  icpBlockchain: CONFIG.ICP_BLOCKCHAIN,
  ogyBlockchain: CONFIG.OGY_BLOCKCKAIN
};

export const initializeMiddleware = async (identity: Identity): Promise<IMiddlewareDependencies> => {
  const agent = new HttpAgent({
    identity: identity,
    host: "https://identity.ic0.app",
  });

  const dataStorage = new DataStorage();

  const identifierService = new IdentifierService(agent, identity.getPrincipal());
  const replicaCanister = createActor(CONFIG.CANISTER_ID_BD, { agent: identifierService.getAgent() });
  const dbContext = new DbContext(identifierService, getRxStorageMemory());

  const assetDataStorage = new AssetDataStorage(identifierService, dbContext, replicaCanister);
  const contactDataStorage = new ContactDataStorage(identifierService, dbContext, replicaCanister);
  const allowanceDataStorage = new AllowanceDataStorage(identifierService, dbContext, replicaCanister);
  const allowanceCacheStorage = new AllowanceCacheStorage(identifierService, dataStorage);
  const localCache = new LocalCacheRepository(identifierService, dataStorage);

  await dbContext.init();
  await assetDataStorage.initReplication();
  await contactDataStorage.initReplication();

  const assetManager = new AssetManager({ ethMarketUrl: CONFIG.ETH_MARKET_URL, tokenMarketUrl: CONFIG.TOKEN_MARKET_URL, defaultDateTimeFormat: "MM/DD/YYYY HH:mm" }, identifierService);
  const assetRepository = new AssetRepository(assetDataStorage);
  const contactRepository = new ContactRepository(contactDataStorage);
  const transactionRepository = new TransactionRepository(identifierService);
  const allowanceRepository = new AllowanceRepository(identifierService, allowanceDataStorage, allowanceCacheStorage)

  return {
    allowanceRepository,
    assetManager,
    assetRepository,
    assetDataStorage,
    contactRepository,
    transactionRepository,
    assetManagerConfiguration,
    transactionManagerConfiguration,
    identifierService,
    localCache,
    dbContext,
  };
}

class DataStorage implements IStorage {
  private items: { key: string; value: string }[] = [];

  getItem(key: string): string | null {
    const item = this.items.find(i => i.key === key);
    return item ? item.value : null;
  }

  setItem(key: string, value: string): void {
    const item = this.items.find(i => i.key === key);
    if (item) {
      item.value = value;
    } else {
      this.items.push({ key, value });
    }
  }

  removeItem(key: string): void {
    this.items = this.items.filter(i => i.key !== key);
  }
}


