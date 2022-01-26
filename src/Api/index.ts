import { OnboardingParams } from './const';
import { fetch } from './fetch';

export const API = {
  getExists: (params: any): any => fetch.get('/exists', { params }),
  getMarkets: (): any => fetch.get('/markets'),
  postPlaceOrder: (data: any): any => fetch.post('/order', data),
  getUser: (): any => fetch.get('/user'),
  postOnboarding: (data: OnboardingParams) => fetch.post('/onboarding', data),
}