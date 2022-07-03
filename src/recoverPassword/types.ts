import { TResponse } from "@/api/apiTypes"

export interface RecPassReq {
  email: string
}

export interface RecPassCodeReq {
  tokenId: string,
  code: string
}

export interface RecPassReCodeReq {
  tokenId: string
}

export interface RecPassCheckTokenReq {
  tokenId: string
}

export interface RecPassRes {
  tokenId: string
}

export interface RecPassChangeReq {
  tokenId: string,
  code: string,
  newPassword: string
}

export type RecPassResponse = TResponse<RecPassRes>
