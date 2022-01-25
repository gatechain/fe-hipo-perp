import { fetch } from './fetch';

export const API = {
  getExists: (params: any): any => fetch.get('/exists', { params }),
  getMarkets: (): any => fetch.get('/markets'),
  postPlaceOrder: (params: any): any => fetch.post('/order', { data:params }),
}