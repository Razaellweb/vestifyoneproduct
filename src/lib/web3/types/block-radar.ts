// export IPayload = Type Recro

export type JSONValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | { [key: string]: JSONValue }
  | JSONValue[];


export type IPayload = Record<string, JSONValue>;

export interface IAsset {
  id: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  asset: {
    id: string;
    name: string;
    symbol: string;
    decimals: number;
    address: string;
    standard: string | null;
    currency: string;
    isActive: boolean;
    logoUrl: string;
    network: string;
    isNative: boolean;
    createdAt: string;
    updatedAt: string;
    blockchain: IBlockChains;
  };
}

export interface IBlockChains {
  id: string;
  name: string;
  symbol: string;
  slug: string;
  derivationPath: string;
  isEvmCompatible: boolean;
  isL2: boolean;
  logoUrl: string;
  isActive: boolean;
  tokenStandard: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface IWallet {
  id: string;
  name: string;
  description: string;
  address: string;
  derivationPath: string;
  isActive: boolean;
  status: "ACTIVE" | "INACTIVE";
  network: string;
  configurations: {
    addresses: {
      prefunding: { rules: unknown[]; isActive: boolean };
    };
    withdrawal: {
      gasless: { isActive: boolean; operator: string; threshold: number };
    };
    autoSweeping: { isActive: boolean; threshold: number };
    autoSettlement: { rules: unknown[]; isActive: boolean };
  };
  createdAt: string;
  updatedAt: string;
  assets: Array<IAsset>;
  blockchain: IBlockChains;
  nativeBalance: string;
  convertedBalance: string;
}

export interface ISingleWallet {
  id: string;
  name: string;
  description: string;
  address: string;
  derivationPath: string;
  isActive: boolean;
  status: "ACTIVE" | "INACTIVE";
  network: string;
  configurations: {
    addresses: {
      prefunding: { rules: unknown[]; isActive: boolean };
    };
    withdrawal: {
      gasless: { isActive: boolean; operator: string; threshold: number };
    };
    autoSweeping: { isActive: boolean; threshold: number };
    autoSettlement: { rules: unknown[]; isActive: boolean };
  };
  createdAt: string;
  updatedAt: string;
  assets: Array<IAsset>;
  blockchain: IBlockChains;
  analytics: {
    currentBalance: string;
    unsweptBalance: string;
    numberOfAssets: number;
  };
}

export interface IResponse<T> {
  message: string;
  statusCode: number;
  data: T;
}

export interface IBalance {
  balance: string;
  convertedBalance: string;
  asset: IAsset;
}

export interface IAddress {
  id: string;
  address: string;
  name: string | null;
  isActive: boolean;
  type: "INTERNAL" | "EXTERNAL" | string; // adjust if only fixed values exist
  derivationPath: string;
  metadata: null; // can refine if structure is known
  configurations: Configurations;
  network: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  blockchain: IBlockChains;
}

export interface AmlConfig {
  status: string;
  message: string;
  provider: string;
}

export interface AutoSettlementConfig {
  rules: []; // can refine if rules have structure
  isActive: boolean;
}

export interface Configurations {
  aml: AmlConfig;
  autoSettlement: AutoSettlementConfig;
  showPrivateKey: boolean;
  disableAutoSweep: boolean;
  enableGaslessWithdraw: boolean;
}

export interface Analytics {
  addressesCount: number;
  externalAddressesCount: number;
  internalAddressesCount: number;
}

export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface AddressesResponse {
  message: string;
  statusCode: number;
  data: IAddress[];
  analytics: Analytics;
  meta: Meta;
}

export interface WithdrawalData {
  senderAddress: string;
  recipientAddress: string;
  amount: string;
  amountPaid: string;
  currency: string;
  hash: string;
  confirmed: boolean;
  status: "PENDING" | "COMPLETED" | "FAILED" | string;
  type: "WITHDRAW" | string;
  network: string;
  blockchain: IBlockChains;
  asset: IAsset;
  wallet: IWallet;
  tokenAddress: string | null;
  fee: string | null;
  feeMetadata: null;
  blockNumber: number | null;
  blockHash: string | null;
  confirmations: number | null;
  gasPrice: string | null;
  gasUsed: string | null;
  gasFee: string | null;
  note: string | null;
  amlScreening: null;
  assetSwept: boolean | null;
  assetSweptAt: string | null;
  assetSweptGasFee: string | null;
  assetSweptHash: string | null;
  assetSweptSenderAddress: string | null;
  assetSweptRecipientAddress: string | null;
  assetSweptAmount: string | null;
  assetSweptResponse: null;
  reason: string | null;
  chainId: number | null;
  metadata: null;
  id: string;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
}

export interface WithdrawalSignedData {
  id: string;
  reference: string;
  senderAddress: string;
  recipientAddress: string;
  tokenAddress: string;
  amount: string;
  amountPaid: string;
  amountUSD: string;
  rateUSD: string;
  fee: string | null;
  feeHash: string | null;
  currency: string;
  toCurrency: string | null;
  blockNumber: number | null;
  blockHash: string | null;
  hash: string;
  confirmations: number | null;
  confirmed: boolean;
  gasPrice: string | null;
  gasUsed: string | null;
  gasFee: string | null;
  status: "SUCCESS" | "PENDING" | "FAILED" | string;
  type: "SIGNED" | string;
  note: string | null;
  amlScreening: AmlScreening | null;
  assetSwept: boolean | null;
  assetSweptAt: string | null;
  assetSweptGasFee: string | null;
  assetSweptHash: string | null;
  assetSweptSenderAddress: string | null;
  assetSweptRecipientAddress: string | null;
  assetSweptAmount: string | null;
  reason: string | null;
  network: string;
  chainId: number | null;
  metadata: null;
  toAmount: string | null;
  signedTransaction: string;
  rate: string | null;
  createdAt: string; // ISO timestamp
  updatedAt: string; // ISO timestamp
  wallet: WalletSigned;
  asset: AssetSigned;
  blockchain: BlockchainSigned;
}

export interface AmlScreening {
  provider: string;
  status: string;
  message: string;
}

export interface WalletSigned {
  id: string;
  name: string;
  description: string;
  address: string;
  derivationPath: string;
  isActive: boolean;
  status: "ACTIVE" | "INACTIVE" | string;
  network: string;
  configurations: WalletConfigurations;
  createdAt: string;
  updatedAt: string;
}

export interface WalletConfigurations {
  withdrawal: {
    gasless: {
      isActive: boolean;
      operator: string;
      threshold: number;
    };
  };
  autoSweeping: {
    isActive: boolean;
    threshold: number;
  };
}

export interface AssetSigned {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  standard: string;
  currency: string;
  isActive: boolean;
  network: string;
  isNative: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BlockchainSigned {
  id: string;
  name: string;
  symbol: string;
  slug: string;
  derivationPath: string;
  isEvmCompatible: boolean;
  isL2: boolean;
  isActive: boolean;
  tokenStandard: string;
  createdAt: string;
  updatedAt: string;
}

export interface AssetWithBlockchain {
  id: string;
  name: string;
  symbol: string;
  decimals: number;
  address: string;
  standard: string | null;
  isActive: boolean;
  logoUrl: string;
  network: string;
  createdAt: string;
  updatedAt: string;
  blockchain: IBlockChains;
}

export interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  emailVerified: boolean;
  twoFactorAuthEnabled: boolean;
  configurations: {
    setNewPasswordRequired: boolean;
  };
  createdAt: string;
  updatedAt: string;
}

export interface ApiCredential {
  id: string;
  key: string;
  type: string;
  isActive: boolean;
  status: string;
  webhookUrl: string;
  revokedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface Business {
  id: string;
  name: string;
  sector: string;
  status: string;
  seedPhrase: string;
  testnetSeedPhrase: string;
  configurations: {
    billing: {
      ccEmails: string[];
      toEmails: string[];
    };
    contact: {
      email: string;
    };
    details: {
      website: string;
      description: string;
    };
    hideLogoUrlInResponse: boolean;
    useCustomWebhookSignatureHeader: boolean;
  };
  createdAt: string;
  updatedAt: string;
  user: User;
}

export interface Wallet {
  id: string;
  name: string;
  description: string;
  address: string;
  derivationPath: string;
  isActive: boolean;
  status: string;
  network: string;
  configurations: null;
  createdAt: string;
  updatedAt: string;
  blockchain: IBlockChains;
  business: Business;
  apiCredential: ApiCredential;
}

export interface SwapTransactionData {
  id: string;
  senderAddress: string;
  recipientAddress: string;
  amount: string;
  confirmed: boolean;
  status: "PENDING" | "SUCCESS" | "FAILED";
  type: "SWAP";
  network: string;
  toAmount: string;
  rate: string;
  blockchain: IBlockChains;
  asset: AssetWithBlockchain;
  wallet: IWallet;
  toWallet: IWallet;
  toAsset: AssetWithBlockchain;
  toBlockchain: IBlockChains;
  tokenAddress: string | null;
  amountPaid: string | null;
  fee: string | null;
  feeMetadata: string | null;
  currency: string | null;
  blockNumber: number | null;
  blockHash: string | null;
  hash: string | null;
  confirmations: number | null;
  gasPrice: string | null;
  gasUsed: string | null;
  gasFee: string | null;
  note: string | null;
  amlScreening: null;
  assetSwept: null;
  assetSweptAt: string | null;
  assetSweptGasFee: string | null;
  assetSweptHash: string | null;
  assetSweptSenderAddress: string | null;
  assetSweptRecipientAddress: string | null;
  assetSweptAmount: string | null;
  assetSweptResponse: null;
  reason: string | null;
  chainId: string | null;
  metadata: null;
  addressId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionsResponse {
  message: string;
  statusCode: number;
  data: ITransaction[];
  meta: Meta;
  analytics?: {
    depositsSumIn24Hours: number;
    withdrawsSumIn24Hours: 0;
    transactionsSumIn24Hours: 0;
    depositsCount: 38;
    withdrawsCount: 22;
    transactionsCount: 64;
  };
}

export interface ITransaction {
  id: string;
  reference: string;
  senderAddress: string;
  recipientAddress: string;
  amount: string;
  amountPaid: string;
  fee: string | null;
  currency: string;
  blockNumber: number;
  blockHash: string;
  hash: string;
  confirmations: number;
  confirmed: boolean;
  gasPrice: string;
  gasUsed: string;
  gasFee: string;
  status: "SUCCESS" | "FAILED" | "PENDING";
  type: "DEPOSIT" | "WITHDRAWAL" | string;
  note: string | null;
  amlScreening: AmlScreening;
  assetSwept: boolean;
  assetSweptAt: string;
  assetSweptGasFee: string;
  assetSweptHash: string;
  assetSweptSenderAddress: string;
  assetSweptRecipientAddress: string;
  assetSweptAmount: string;
  reason: string;
  network: string;
  chainId: number;
  metadata: unknown | null;
  createdAt: string;
  updatedAt: string;
  address: IAddress;
  asset: IAsset;
  blockchain: IBlockChains;
}

export interface AddressConfigurations {
  aml: {
    status: string;
    message: string;
    provider: string;
  };
  isActive: boolean;
  showPrivateKey: boolean;
  disableAutoSweep: boolean;
  enableGaslessWithdraw: boolean;
}

export interface IWebhookLog<T> {
  id: string;
  url: string;
  reference: string;
  event: string; // e.g., "deposit.success"
  payload: T;
  response: string;
  attempts: number;
  status: string; // e.g., "success" | "failed"
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentLink {
  name: string;
  description: string;
  slug: string;
  currency: string;
  redirectUrl: string;
  active: boolean;
  network: "testnet" | "mainnet"; // constrain to known values
  type: "payment" | "subscription"; // extend if needed
  createdChannel: string;
  configurations: Record<string, unknown>;
  amount: number | null;
  imageUrl: string | null;
  successMessage: string | null;
  inactiveMessage: string | null;
  metadata: Record<string, unknown> | null;
  id: string;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
  url: string;
}

export interface IBeneficiary {
  name: string;
  address: string;
  isSettlement: boolean;
  settlementFrequency: "DAILY" | "WEEKLY" | "MONTHLY"; // extend if API supports more
  isWhitelisted: boolean;
  deletedAt: string | null; // ISO datetime or null
  id: string;
  isActive: boolean;
  isDefault: boolean;
  createdAt: string; // ISO datetime
  updatedAt: string; // ISO datetime
}


export interface IBeneficiaryResponse {
  data: Array<IBeneficiary>;
  meta: Meta;
  message: string
  statusCode: number
}

export interface AutoSettlementSource {
  assets: string[];
  minAmount: string;
  maxAmount: string;
  blockchain: string;
}

export interface AutoSettlementDestination {
  blockchain: string;
  asset: string;
  address: string;
}

export interface IAutoSettlementRuleData {
  id: string;
  name: string;
  isActive: boolean;
  order: "FASTEST" | "CHEAPEST"; // extend if API supports more
  slippageTolerance: string;
  source: AutoSettlementSource;
  destination: AutoSettlementDestination;
}


export interface IAutoSettlementRuleDataResponse {
  data: Array<IAutoSettlementRuleData>;
  meta: Meta;
  message: string;
  statusCode: number;
}

export interface AutoSettlementSource {
  assets: string[];
  minAmount: string;
  maxAmount: string;
  blockchain: string;
}

export interface AutoSettlementDestination {
  asset: string;
  address: string;
  isGateway: boolean;
  blockchain: string;
}

export interface AutoSettlementRule {
  name: string;
  order: "FASTEST" | "CHEAPEST"; // extend if API supports more
  source: AutoSettlementSource;
  destination: AutoSettlementDestination;
  isActive: boolean;
  slippageTolerance: string;
}

export interface AutoSettlementsData {
  name: string;
  rules: AutoSettlementRule[];
  isActive: boolean;
}

export interface FetchAutoSettlementsResponse {
  message: string;
  statusCode: number;
  data: AutoSettlementsData;
}
