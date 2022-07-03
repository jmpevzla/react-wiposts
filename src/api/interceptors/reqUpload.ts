import type { AxiosRequestConfig } from "axios"

export default reqUploadInterceptor

function reqUploadInterceptor(config: AxiosRequestConfig) {
  
  config.headers = {
    ...config.headers,
    'content-type': 'multipart/form-data'
  }
  
  return config
}