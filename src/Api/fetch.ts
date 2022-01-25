import axios, { AxiosInstance } from 'axios'


export function setHeaderAuthorization() {
  let headers = {}
  if (typeof window !== 'undefined') {
    const token = localStorage?.getItem('token')
    if (token) {
      headers = {
        Authorization: 'Bearer ' + token,
      }
    }
  }
  return headers
}

export class Axios {
  private instance: AxiosInstance

  init() {

    this.instance = axios.create({
      baseURL: 'http://www.hipo.com/trade/',
      timeout: 1000,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    this.interceptors()
    return this.instance
  }

  interceptors() {
    this.instance.interceptors.response.use((response) => {
      if (response.status === 200 && response.data.code === 0) {
        return response.data.data
      }
      return response.data
    }, (error) => {
      return Promise.reject(error)
    })
    // this.instance.interceptors.request.use((config) => {
    //   if (typeof window !== 'undefined') {
    //     const token = localStorage?.getItem('token')
    //     if (token) {
    //       config.headers = {
    //         ...config.headers,
    //         Authorization: 'Bearer ' + token,
    //       }
    //     }
    //   }
    //   return config
    // }, (error) => Promise.reject(error))
  }

  getInstance(): AxiosInstance {
    if (this.instance) {
      return this.instance
    }
    return this.init()
  }
}

export const fetch = new Axios().getInstance()