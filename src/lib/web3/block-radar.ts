// blockRadar.ts
/**
 * this api is created according to the block radar docs at  https://documenter.getpostman.com/view/7709133/2s93eSYaVs#ccca32de-09d8-4ee8-85c0-1a32ad26d25b
 */

import { BaseClient } from "./base";
// import { Web3Provider } from "./interface";
import {
  IWallet,
  ISingleWallet,
  IResponse,
  IBalance,
  AddressesResponse,
  IAddress,
  WithdrawalData,
  WithdrawalSignedData,
  IAsset,
  SwapTransactionData,
  TransactionsResponse,
  ITransaction,
  IWebhookLog,
  IPayload,
  IPaymentLink,
  IBeneficiary,
  IBeneficiaryResponse,
  IAutoSettlementRuleData,
  IAutoSettlementRuleDataResponse,
  AutoSettlementsData,
  Meta,
} from "./types";

export class BlockRadarProvider extends BaseClient {
  //   implements Web3Provider
  constructor() {
    if (!process.env.BLOCK_RADAR_KEY)
      throw new Error("Block Radar API key is required.");

    super({
      debug: process.env.NODE_ENV === "development",
      baseURL: "https://api.blockradar.co/v1",
      headers: {
        "x-api-key": process.env.BLOCK_RADAR_KEY as string,
      },
    });
  }

  async getWallets() {
    const response = await this.request<IResponse<IWallet[]>>(
      "GET",
      "/wallets"
    );
    return response.data;
  }

  async getWallet(walletId: string) {
    const response = await this.request<IResponse<ISingleWallet>>(
      "GET",
      `/wallets/${walletId}`
    );
    return response.data;
  }

  async updateWallet(walletId: string, payload: IPayload) {
    const response = await this.request<IResponse<ISingleWallet>>(
      "PATCH",
      `/wallets/${walletId}`,
      { payload }
    );
    return response.data;
  }

  async getBalance(walletId: string, assetId?: string) {
    const response = await this.request<IResponse<IBalance>>(
      "PATCH",
      `/wallets/${walletId}/balance?assetId=${assetId}`
    );
    return response.data;
  }

  async getBalances(walletId: string) {
    const response = await this.request<IResponse<IBalance>>(
      "GET",
      `/wallets/${walletId}/balances`
    );
    return response.data;
  }

  async reScanBlocks(walletId: string) {
    await this.request<IResponse<never>>(
      "POST",
      `/wallets/${walletId}/rescan/blocks`
    );
    return true;
  }

  async sweepTransactions(walletId: string) {
    await this.request<IResponse<never>>(
      "POST",
      `/wallets/${walletId}/sweep/assets`
    );
    return true;
  }

  async getWalletAddresses(walletId: string) {
    const responses = await this.request<AddressesResponse>(
      "GET",
      `/wallets/${walletId}/addresses`
    );
    return responses;
  }
  async getOneWalletAddress(walletId: string, addressId: string) {
    const responses = await this.request<IResponse<IAddress>>(
      "GET",
      `/wallets/${walletId}/addresses/${addressId}`
    );
    return responses.data;
  }

  async generateAddress(walletId: string, payload: IPayload) {
    const responses = await this.request<IResponse<IAddress>>(
      "POST",
      `/wallets/${walletId}/addresses`,
      { payload }
    );
    return responses.data;
  }

  async withdrawFromAddressNetworkFree(
    walletId: string,
    addressId: string,
    payload: IPayload
  ) {
    const responses = await this.request<
      IResponse<{ networkFee: string; nativeBalance: string }>
    >(
      "POST",
      `/wallets/${walletId}/addresses/${addressId}/withdraw/network-fee`,
      { payload }
    );
    return responses.data;
  }

  async withdrawFromAddress(
    walletId: string,
    addressId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<WithdrawalData>>(
      "POST",
      `/wallets/${walletId}/addresses/${addressId}/withdraw`,
      { payload }
    );
    return responses.data;
  }

  async withdrawSignedFromAddress(
    walletId: string,
    addressId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<WithdrawalSignedData>>(
      "POST",
      `/wallets/${walletId}/addresses/${addressId}/withdraw/sign`,
      { payload }
    );
    return responses.data;
  }

  async updateWalletAddress(
    walletId: string,
    addressId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<IAddress>>(
      "POST",
      `/wallets/${walletId}/addresses/${addressId}`,
      { payload }
    );
    return responses.data;
  }

  async getAddressBalance(
    walletId: string,
    addressId: string,
    assetId: string
  ) {
    const responses = await this.request<
      IResponse<{ asset: IAsset; balance: string; convertedBalance: string }>
    >("GET", `/wallets/${walletId}/addresses/${addressId}/balance`, {
      params: { assetId },
    });
    return responses.data;
  }

  async getAddressBalances(walletId: string, addressId: string) {
    const responses = await this.request<
      IResponse<{ asset: IAsset; balance: string; convertedBalance: string }>
    >("GET", `/wallets/${walletId}/addresses/${addressId}/balances`);
    return responses.data;
  }

  async getSwapQuoteForAddress(
    walletId: string,
    addressId: string,
    payload: IPayload
  ) {
    const responses = await this.request<
      IResponse<{
        rate: string;
        amount: string;
        minAmount: string;
        slippage: string;
        impact: string;
        impactInUSD: string;
        networkFee: string;
        networkFeeInUSD: string;
        nativeBalance: string;
        nativeBalanceInUSD: string;
        estimatedArrivalTime: number;
        transactionFee: number;
      }>
    >("POST", `/wallets/${walletId}/addresses/${addressId}/swaps/quote`, {
      payload,
    });
    return responses.data;
  }

  async executeSwapForAddress(
    walletId: string,
    addressId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<SwapTransactionData>>(
      "POST",
      `/wallets/${walletId}/addresses/${addressId}/swaps/execute`,
      {
        payload,
      }
    );
    return responses.data;
  }

  async getWalletAddressesTransaction(walletId: string, addressId: string) {
    const responses = await this.request<IResponse<TransactionsResponse>>(
      "GET",
      `/wallets/${walletId}/addresses/${addressId}/transactions`
    );
    return responses;
  }

  async getOneWalletAddressesTransaction(
    walletId: string,
    addressId: string,
    transactionId: string
  ) {
    const responses = await this.request<IResponse<TransactionsResponse>>(
      "GET",
      `/wallets/${walletId}/addresses/${addressId}/transactions/${transactionId}`
    );
    return responses;
  }

  async whitelistAddress(walletId: string, payload: IPayload) {
    const responses = await this.request<IResponse<IWallet>>(
      "POST",
      `/wallets/${walletId}/addresses/whitelist`,
      { payload }
    );
    return responses.data;
  }

  async unWhitelistAddress(walletId: string, addressId: string) {
    const responses = await this.request<IResponse<IWallet>>(
      "DELETE",
      `/wallets/${walletId}/addresses/whitelist/${addressId}`
    );
    return responses.data;
  }

  async getWalletAssets(walletId: string) {
    const responses = await this.request<IResponse<IAsset>>(
      "GET",
      `/wallets/${walletId}/assets`
    );
    return responses.data;
  }

  async addAssetToWallet(walletId: string, payload: IPayload) {
    const responses = await this.request<IResponse<IAsset>>(
      "POST",
      `/wallets/${walletId}/assets`,
      { payload }
    );
    return responses.data;
  }

  async updateWalletAsset(
    walletId: string,
    assetId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<IAsset>>(
      "PATCH",
      `/wallets/${walletId}/assets/${assetId}`,
      { payload }
    );
    return responses.data;
  }
  async removeAssetFromWallet(
    walletId: string,
    assetId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<IAsset>>(
      "DELETE",
      `/wallets/${walletId}/assets/${assetId}`,
      { payload }
    );
    return responses.data;
  }

  async getWalletTransactions(
    walletId: string,
    params: Record<string, string>
  ) {
    const responses = await this.request<TransactionsResponse>(
      "GET",
      `/wallets/${walletId}/transactions`,
      { params }
    );
    return responses;
  }

  async getWalletTransaction(
    walletId: string,
    transactionId: string,
    params: Record<string, string>
  ) {
    const responses = await this.request<TransactionsResponse>(
      "GET",
      `/wallets/${walletId}/transactions/${transactionId}`,
      { params }
    );
    return responses;
  }

  async resendWebHook(
    walletId: string,
    transactionId: string,
    params: Record<string, string>
  ) {
    const responses = await this.request<TransactionsResponse>(
      "GET",
      `/wallets/${walletId}/transactions/${transactionId}`,
      { params }
    );
    return responses;
  }

  async retryTransactions(walletId: string, transactionId: string) {
    const responses = await this.request<IResponse<ITransaction>>(
      "POST",
      `/wallets/${walletId}/transactions/retry`,
      { payload: { id: transactionId } }
    );
    return responses;
  }
  async cancelTransactions(walletId: string, transactionId: string) {
    const responses = await this.request<IResponse<ITransaction>>(
      "POST",
      `/wallets/${walletId}/transactions/cancel`,
      { payload: { id: transactionId } }
    );
    return responses;
  }
  async sweepTransactionsAssets(walletId: string) {
    const responses = await this.request<IResponse<ITransaction>>(
      "POST",
      `/wallets/${walletId}/transactions/sweep/assets`
    );
    return responses;
  }

  async getWebHookLogsForTransactions(walletId: string) {
    const responses = await this.request<
      IResponse<Array<IWebhookLog<ITransaction>>>
    >("POST", `/wallets/${walletId}/transactions/sweep/assets`);
    return responses;
  }

  async withdrawFromWalletNetworkFree(
    walletId: string,
    payload: IPayload
  ) {
    const responses = await this.request<
      IResponse<{ networkFee: string; nativeBalance: string }>
    >("POST", `/wallets/${walletId}/withdraw/network-fee`, { payload });
    return responses.data;
  }

  async withdrawFromWallet(walletId: string, payload: IPayload) {
    const responses = await this.request<IResponse<WithdrawalData>>(
      "POST",
      `/wallets/${walletId}/withdraw`,
      { payload }
    );
    return responses.data;
  }

  async withdrawSignedFromWallet(
    walletId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<WithdrawalSignedData>>(
      "POST",
      `/wallets/${walletId}/withdraw/sign`,
      { payload }
    );
    return responses.data;
  }

  async getSwapQuoteForWallet(
    walletId: string,
    payload: IPayload
  ) {
    const responses = await this.request<
      IResponse<{
        rate: string;
        amount: string;
        minAmount: string;
        slippage: string;
        impact: string;
        impactInUSD: string;
        networkFee: string;
        networkFeeInUSD: string;
        nativeBalance: string;
        nativeBalanceInUSD: string;
        estimatedArrivalTime: number;
        transactionFee: number;
      }>
    >("POST", `/wallets/${walletId}/swaps/quote`, {
      payload,
    });
    return responses.data;
  }

  async executeSwapForWallet(
    walletId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<SwapTransactionData>>(
      "POST",
      `/wallets/${walletId}/swaps/execute`,
      {
        payload,
      }
    );
    return responses.data;
  }

  async getSupportedAssets() {
    const responses = await this.request<IResponse<Array<IAsset>>>(
      "GET",
      `/assets`
    );
    return responses.data;
  }
  async getAssetsRates(assets: string, currency: string) {
    const responses = await this.request<
      IResponse<Record<string, Record<string, number>>>
    >("GET", `/assets/rates`, {
      params: { assets, currency },
    });
    return responses.data?.[assets]?.[currency];
  }
  async getBlockchain(assets: string, currency: string) {
    const responses = await this.request<IResponse<Array<IAsset>>>(
      "GET",
      `/assets/rates`,
      {
        params: { assets, currency },
      }
    );
    return responses.data;
  }

  async createPaymentLink(payload: IPayload) {
    const responses = await this.request<IResponse<IPaymentLink>>(
      "POST",
      `/payments_links`,
      {
        payload,
      }
    );
    return responses.data;
  }
  async updatePaymentLink(paymentLinkId: string, payload: IPayload) {
    const responses = await this.request<IResponse<IPaymentLink>>(
      "PATCH",
      `/payments_links/${paymentLinkId}`,
      {
        payload,
      }
    );
    return responses.data;
  }

  async getPaymentLinks() {
    const responses = await this.request<IResponse<Array<IPaymentLink>>>(
      "GET",
      `/payments_links`
    );
    return responses;
  }

  async getPaymentLink(paymentLinkId: string) {
    const responses = await this.request<IResponse<IPaymentLink>>(
      "GET",
      `/payments_links/${paymentLinkId}`
    );
    return responses;
  }

  async AMLLookup(address: string, blockchain: string) {
    const responses = await this.request<IResponse<{ isBlackListed: boolean }>>(
      "GET",
      `/aml/lookup`,
      { params: { address, blockchain } }
    );
    return responses;
  }

  async salvage(walletId: string, payload: IPayload) {
    await this.request<IResponse<never>>(
      "GET",
      `/wallets/${walletId}/salvage`,
      { payload }
    );
    return true;
  }

  async salvageNetworkFee(walletId: string, payload: IPayload) {
    const response = await this.request<
      IResponse<{
        balance: string;
        nativeBalance: string;
        fee: string;
        symbol: string;
      }>
    >("GET", `/wallets/${walletId}/salvage/network-fee`, { payload });
    return response;
  }

  async createBeneficiary(walletId: string, payload: IPayload) {
    const responses = await this.request<IResponse<IBeneficiary>>(
      "POST",
      `/wallets/${walletId}/beneficiaries`,
      {
        payload,
      }
    );
    return responses.data;
  }

  async updateBeneficiary(
    walletId: string,
    beneficiaryId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<IPaymentLink>>(
      "PATCH",
      `/wallets/${walletId}/beneficiaries/${beneficiaryId}`,
      {
        payload,
      }
    );
    return responses.data;
  }

  async getBeneficiaries(walletId: string) {
    const responses = await this.request<IBeneficiaryResponse>(
      "GET",
      `/wallets/${walletId}/beneficiaries`
    );
    return responses;
  }

  async getBeneficiary(walletId: string, beneficiaryId: string) {
    const responses = await this.request<IResponse<IPaymentLink>>(
      "GET",
      `/wallets/${walletId}/beneficiaries/${beneficiaryId}`
    );
    return responses;
  }

  async deleteBeneficiary(walletId: string, beneficiaryId: string) {
    await this.request<IResponse<never>>(
      "DELETE",
      `/wallets/${walletId}/beneficiaries/${beneficiaryId}`
    );
    return true;
  }

  async readSmartContract(walletId: string, payload: IPayload) {
    const response = await this.request<IResponse<string>>(
      "POST",
      `/wallets/${walletId}/contracts/read`,
      { payload }
    );
    return response;
  }

  async writeSmartContract(walletId: string, payload: IPayload) {
    const response = await this.request<IResponse<WithdrawalData>>(
      "POST",
      `/wallets/${walletId}/contracts/write`,
      { payload }
    );
    return response;
  }

  async writeSmartContractSigned(walletId: string, payload: IPayload) {
    const response = await this.request<IResponse<WithdrawalData>>(
      "POST",
      `/wallets/${walletId}/contracts/write/sign`,
      { payload }
    );
    return response;
  }

  async networkFeeForSmartContract(walletId: string, payload: IPayload) {
    const response = await this.request<
      IResponse<{
        fee: string;
        balance: string;
      }>
    >("POST", `/wallets/${walletId}/contracts/network-fee`, { payload });
    return response;
  }

  async createSettlementRule(walletId: string, payload: IPayload) {
    const responses = await this.request<IResponse<IAutoSettlementRuleData>>(
      "POST",
      `/wallets/${walletId}/auto-settlements/rules`,
      {
        payload,
      }
    );
    return responses.data;
  }

  async updateSettlementRule(
    walletId: string,
    ruleId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<IAutoSettlementRuleData>>(
      "PATCH",
      `/wallets/${walletId}/auto-settlements/rules/${ruleId}`,
      {
        payload,
      }
    );
    return responses.data;
  }

  async deleteSettlementRule(walletId: string, ruleId: string) {
    const response = await this.request<IResponse<IAutoSettlementRuleData>>(
      "DELETE",
      `/wallets/${walletId}/auto-settlements/rules/${ruleId}`
    );
    return response.data;
  }

  async getSettlementRules(walletId: string) {
    const responses = await this.request<IAutoSettlementRuleDataResponse>(
      "GET",
      `/wallets/${walletId}/auto-settlements/rules`
    );
    return responses;
  }

  async getSettlementRule(walletId: string, ruleId: string) {
    const responses = await this.request<IResponse<IAutoSettlementRuleData>>(
      "GET",
      `/wallets/${walletId}/auto-settlements/rules/${ruleId}`
    );
    return responses;
  }

  async getSettlements(walletId: string, params?: Record<string, string>) {
    const responses = await this.request<IAutoSettlementRuleDataResponse>(
      "GET",
      `/wallets/${walletId}/auto-settlements`,
      { params }
    );
    return responses;
  }

  async updateSettlement(walletId: string, isActive: boolean) {
    const responses = await this.request<IResponse<AutoSettlementsData>>(
      "PATCH",
      `/wallets/${walletId}/auto-settlements`,
      {
        payload: { isActive },
      }
    );
    return responses.data;
  }

  async getGatewayWallets(params?: Record<string, string>) {
    const responses = await this.request<{
      statusCode: number;
      message: string;
      meta: Meta;
      data: Array<IWallet>;
    }>("GET", `/gateway/wallets`, { params });
    return responses;
  }

  async getGatewayTransactions(params?: Record<string, string>) {
    const responses = await this.request<{
      statusCode: number;
      message: string;
      meta: Meta;
      data: Array<ITransaction>;
    }>("GET", `/gateway/Transactions`, { params });
    return responses;
  }

  async getGatewayBalance(params?: Record<string, string>) {
    const responses = await this.request<
      IResponse<{
        asset: {
          id: string;
          name: string;
          symbol: string;
          decimals: number;
          currency: string;
          isActive: boolean;
          logoUrl: string;
          network: string;
          isNative: boolean;
          createdAt: Date;
          updatedAt: Date;
        };
        balance: string;
        convertedBalance: string;
      }>
    >("GET", `/gateway/balance`, { params });
    return responses;
  }

  async createGatewayDeposit(walletId: string, payload: IPayload) {
    const responses = await this.request<IResponse<ITransaction>>(
      "POST",
      `/gateway/deposit/${walletId}`,
      {
        payload,
      }
    );
    return responses.data;
  }
  async gatewayDepositNetworkFee(walletId: string, payload: IPayload) {
    const responses = await this.request<
      IResponse<{
        networkFee: string;
        networkFeeInUSD: string;
        nativeBalance: string;
        nativeBalanceInUSD: string;
        estimatedArrivalTime: number;
        transactionFee: number;
      }>
    >("POST", `/gateway/deposit/${walletId}/network-fee`, {
      payload,
    });
    return responses.data;
  }

  async createGatewayWithdrawal(payload: IPayload) {
    const responses = await this.request<IResponse<ITransaction>>(
      "POST",
      `/gateway/withdraw`,
      {
        payload,
      }
    );
    return responses.data;
  }

  async gatewayWithdrawalNetworkFee(payload: IPayload) {
    const responses = await this.request<
      IResponse<{
        networkFee: string;
        networkFeeInUSD: string;
        nativeBalance: string;
        nativeBalanceInUSD: string;
        estimatedArrivalTime: number;
        transactionFee: number;
      }>
    >("POST", `/gateway/deposit/network-fee`, {
      payload,
    });
    return responses.data;
  }

  async createSettlementRuleForAddress(
    walletId: string,
    addressId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<IAutoSettlementRuleData>>(
      "POST",
      `/wallets/${walletId}/address/${addressId}/auto-settlements/rules`,
      {
        payload,
      }
    );
    return responses.data;
  }

  async updateSettlementRuleForAddress(
    walletId: string,
    addressId: string,
    ruleId: string,
    payload: IPayload
  ) {
    const responses = await this.request<IResponse<IAutoSettlementRuleData>>(
      "PATCH",
      `/wallets/${walletId}/address/${addressId}/auto-settlements/rules/${ruleId}`,
      {
        payload,
      }
    );
    return responses.data;
  }

  async deleteSettlementRuleForAddress(
    walletId: string,
    addressId: string,
    ruleId: string
  ) {
    const response = await this.request<IResponse<IAutoSettlementRuleData>>(
      "DELETE",
      `/wallets/${walletId}/address/${addressId}/auto-settlements/rules/${ruleId}`
    );
    return response.data;
  }

  async getSettlementRulesForAddress(walletId: string, addressId: string) {
    const responses = await this.request<IAutoSettlementRuleDataResponse>(
      "GET",
      `/wallets/${walletId}/address/${addressId}/auto-settlements/rules`
    );
    return responses;
  }

  async getSettlementRuleForAddress(
    walletId: string,
    addressId: string,
    ruleId: string
  ) {
    const responses = await this.request<IResponse<IAutoSettlementRuleData>>(
      "GET",
      `/wallets/${walletId}/address/${addressId}/auto-settlements/rules/${ruleId}`
    );
    return responses;
  }

  async getSettlementsForAddress(
    walletId: string,
    addressId: string,
    params?: Record<string, string>
  ) {
    const responses = await this.request<IAutoSettlementRuleDataResponse>(
      "GET",
      `/wallets/${walletId}/address/${addressId}/auto-settlements`,
      { params }
    );
    return responses;
  }

  async updateSettlementForAddress(
    walletId: string,
    addressId: string,
    isActive: boolean
  ) {
    const responses = await this.request<IResponse<AutoSettlementsData>>(
      "PATCH",
      `/wallets/${walletId}/address/${addressId}/auto-settlements`,
      {
        payload: { isActive },
      }
    );
    return responses.data;
  }
}
