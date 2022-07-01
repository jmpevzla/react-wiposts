import Axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { endpoint } from '@/endpoint'
import responseErrorInterceptor from './interceptors/respError'
import responseOkInterceptor from './interceptors/respOk'

Axios.defaults.baseURL = endpoint

function addRequest(axiosInstance: AxiosInstance, 
  onFulfilled?: (config: AxiosRequestConfig) => AxiosRequestConfig, 
  onRejected?: (error: any) => any) {

  axiosInstance.interceptors.request.use(onFulfilled, onRejected)  
}

function addResponse(axiosInstance: AxiosInstance, 
  onFulfilled?: (response: AxiosResponse) => AxiosResponse, 
  onRejected?: (error: any) => any) {

  axiosInstance.interceptors.response.use(onFulfilled, onRejected)  
}

export const axiosAuth = Axios.create()
addResponse(axiosAuth, responseOkInterceptor, responseErrorInterceptor)

export const axios = Axios.create()
addRequest(axios, (config) => {
  config.headers = {
    'no-auth': '1'
  }
  return config
})
addResponse(axios, responseOkInterceptor, responseErrorInterceptor)