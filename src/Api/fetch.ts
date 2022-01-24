import axios, { AxiosInstance } from 'axios'

export class Axios {
  private instance: AxiosInstance

  init() {
    this.instance = axios.create({
      baseURL: 'http://www.hipo.com/trade/',
      timeout: 1000,
    })
    return this.instance
  }

  getInstance(): AxiosInstance {
    if (this.instance) {
      return this.instance
    }
    return this.init()
  }
}

export const fetch = new Axios().getInstance()