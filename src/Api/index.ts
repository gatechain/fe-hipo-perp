import { fetch } from './fetch';

export const API = {
  getExists: (data) => fetch.get('/exists', { data }),
  getMarkets: (): any => fetch.get('/markets'),
}