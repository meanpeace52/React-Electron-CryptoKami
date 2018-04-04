// @flow
import { request } from './lib/request';

export type PostponeAdaUpdateParams = {
  ca: string,
};

export const postponeAdaUpdate = (
  { ca }: PostponeAdaUpdateParams
  ): Promise<any> => (
  request({
    hostname: 'gotest.cryptokami.com',
    method: 'POST',
    path: '/api/update/postpone',
    port: 8090,
    ca,
  })
);
