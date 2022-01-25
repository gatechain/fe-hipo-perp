import { OnboardingParams } from './const';
import { fetch, setHeaderAuthorization } from './fetch';

export const API = {
  getExists: (params: any): any => fetch.get('/exists', { params }),
  getMarkets: (): any => fetch.get('/markets'),
  getUser: (): any => fetch.get('/user', {
    headers: setHeaderAuthorization(),
  }),
  postOnboarding: (data: OnboardingParams) => fetch.post('/onboarding', data),
}