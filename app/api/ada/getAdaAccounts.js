// @flow
import type { AdaAccounts } from './types';
import { request } from './lib/request';

export type GetAdaAccountsParams = {
  ca: string,
};

export const getAdaAccounts = (
  { ca }: GetAdaAccountsParams
): Promise<AdaAccounts> => (
  request({
    hostname: 'gotest.cryptokami.com',
    method: 'GET',
    path: '/api/accounts',
    port: 8090,
    ca,
  })
);
