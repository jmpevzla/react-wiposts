import type { AxiosResponse } from "axios";
import type { RecPassCodeReq, RecPassReq
  , RecPassResponse, RecPassChangeReq
  , RecPassReCodeReq
  , RecPassCheckTokenReq } from "../types";

import { axios } from '@/api/getAxios'

const rootApi = '/auth/recover'

export async function recoverPasswordApi(data: RecPassReq): Promise<RecPassResponse> {
  const res = await axios.post<any, AxiosResponse<RecPassResponse>, RecPassReq>
    (`${rootApi}/send-code`, data)

  return res.data
}

export async function recoverPasswordCodeApi(data: RecPassCodeReq): Promise<void> {
  await axios.get<any, AxiosResponse<void>, RecPassCodeReq>
    (`${rootApi}/check-code/token/${data.tokenId}/code/${data.code}`)
}

export async function recoverPasswordChangeApi(data: RecPassChangeReq): Promise<void> {
  await axios.post<any, AxiosResponse<void>, RecPassChangeReq>
    (`${rootApi}/change/token/${data.tokenId}/code/${data.code}`, data)
}

export async function recoverPasswordReSendCodeApi(data: RecPassReCodeReq): Promise<void> {
  await axios.post<any, AxiosResponse<void>, RecPassReCodeReq>
    (`${rootApi}/resend-code/${data.tokenId}`)
}

export async function recoverPasswordCheckTokenApi(data: RecPassCheckTokenReq): Promise<void> {
  await axios.get<any, AxiosResponse<void>, RecPassCheckTokenReq>
    (`${rootApi}/check-token/${data.tokenId}`)
}