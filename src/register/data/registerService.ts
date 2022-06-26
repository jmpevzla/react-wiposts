import type { AxiosResponse } from "axios";
import type { Register } from "../types";

import type { TAuthResponse } from "@/api/apiTypes";
import { axiosAuth } from '@/api/getAxios'

export async function doRegisterApi(data: Register): Promise<TAuthResponse> {
  const res = await axiosAuth.post<any, AxiosResponse<TAuthResponse>, Register>
    (`/register`, data)

  return res.data
}