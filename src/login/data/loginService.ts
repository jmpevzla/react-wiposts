import type { AxiosResponse } from "axios";
import type { Login } from "../types";

import type { TAuthResponse } from "@/api/apiTypes";
import { axiosAuth } from '@/api/getAxios'

export async function doLoginApi(data: Login): Promise<TAuthResponse> {
  const res = await axiosAuth.post<any, AxiosResponse<TAuthResponse>, Login>
    (`/login`, data)

  return res.data
}