import type { AxiosResponse } from "axios";
import type { RecPassCodeReq, RecPassReq
  , RecPassResponse, RecPassChangeReq
  , RecPassReCodeReq, 
  RecPassCheckTokenReq } from "../types";

import { axios } from '@/api/getAxios'

export async function recoverPasswordApi(data: RecPassReq): Promise<RecPassResponse> {
  const res = await axios.post<any, AxiosResponse<RecPassResponse>, RecPassReq>
    (`/recover-password`, data)

  return res.data
}

export async function recoverPasswordCodeApi(data: RecPassCodeReq): Promise<void> {
  await axios.get<any, AxiosResponse<void>, RecPassCodeReq>
    (`/recover-password/${data.tokenId}/code/${data.code}`)
}

export async function recoverPasswordChangeApi(data: RecPassChangeReq): Promise<void> {
  await axios.post<any, AxiosResponse<void>, RecPassChangeReq>
    (`/recover-password/${data.tokenId}/code/${data.code}/change`, data)
}

export async function recoverPasswordReSendCodeApi(data: RecPassReCodeReq): Promise<void> {
  await axios.post<any, AxiosResponse<void>, RecPassReCodeReq>
    (`/recover-password/${data.tokenId}/resend-code`)
}

export async function recoverPasswordCheckTokenApi(data: RecPassCheckTokenReq): Promise<void> {
  await axios.get<any, AxiosResponse<void>, RecPassCheckTokenReq>
    (`/recover-password/${data.tokenId}`)
}