import { DepositParams, OnboardingParams } from './const';
import { fetch } from './fetch';

export const API = {
  getExists: (params: any): any => fetch.get('/exists', { params }),
  getMarkets: (): any => fetch.get('/markets'),
  postPlaceOrder: (params: any): any => fetch.post('/order', { data: params }),
  getUser: (): any => fetch.get('/user'),
  postOnboarding: (data: OnboardingParams) => fetch.post('/onboarding', data),
  postDeposit: (data: DepositParams): any => fetch.post('/deposit', data),
  postWithdraw: (data: { amount: string }): any => fetch.post('/withdraw', data),
}