/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Web3Provider {
  /**
   * get wallets
   */
  //   getWallets<T>(): Promise<Array<T>>;
  getWallets(): Promise<any[]>;

  /**
   * get a single wallet
   */
  getWallet(id: string): Promise<any>;
}
