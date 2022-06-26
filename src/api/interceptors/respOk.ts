import type { AxiosResponse } from "axios"
import type { TResponse } from "../apiTypes"

export default responseOkInterceptor

function responseOkInterceptor(response: AxiosResponse<TResponse>) { 
  const info: any = response.data

  response.data = {
    info
  }

  return response
}