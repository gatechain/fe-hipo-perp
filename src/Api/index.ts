import { fetch } from './fetch';

export const API = {
  getExists: (data) => fetch.get('/exists', { data }),
  getMarkets: () => fetch.get('/markets'),
}