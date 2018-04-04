// @flow
import type { AdaTransactions } from './types';
import { request } from './lib/request';

export type GetAdaHistoryByWalletParams = {
  ca: string,
  walletId: string,
  skip: number,
  limit: number,
};

export const getAdaHistoryByWallet = (
  { ca, walletId, skip, limit }: GetAdaHistoryByWalletParams
): Promise<AdaTransactions> => (
  request({
    hostname: 'gotest.cryptokami.com',
    method: 'GET',
    path: '/api/txs/histories',
    port: 8090,
    ca,
  }, { walletId, skip, limit })
);
