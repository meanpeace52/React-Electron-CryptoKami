// @flow
import { request } from './lib/request';

export type DeleteAdaWalletParams = {
  ca: string,
  walletId: string,
};

export const deleteAdaWallet = (
  { ca, walletId }: DeleteAdaWalletParams
): Promise<[]> => (
  request({
    hostname: 'gotest.cryptokami.com',
    method: 'DELETE',
    path: `/api/wallets/${walletId}`,
    port: 8090,
    ca,
  })
);
