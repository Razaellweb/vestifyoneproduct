// // payment.service.ts
// import { Web3Provider } from "./interface";
// import { BlockRadarProvider } from "./block-radar";

// export class Web3Service<T extends Web3Provider = Web3Provider> {
//   constructor(private provider: T) {}

//   async getWallets() {
//     return this.provider.getWallets();
//   }

//   async getWallet(id: string) {
//     return this.provider.getWallet(id);
//   }

// //   async getTransactions(walletId: string) {
// //     return this.provider.getTransactions(walletId);
// //   }

// //   async getBalance(address: string) {
// //     return this.provider.getBalance(address);
// //   }
// }

// const blockRadarService = new Web3Service(new BlockRadarProvider());

// const wallets = blockRadarService.getWallets()