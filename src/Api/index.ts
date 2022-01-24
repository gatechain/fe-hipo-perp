import { fetch } from './fetch';

export const API = {
  getExists: (params: any): any => fetch.get('/exists', { params }),
  getMarkets: () => fetch.get('/markets'),
}