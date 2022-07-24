import type { AxiosResponse } from "axios";
import type { Config, ConfigResponse } from "../types";

import { axios } from '@/api/getAxios'

export async function getConfigApi(): Promise<ConfigResponse> {
  const res = await axios.get<any, AxiosResponse<ConfigResponse>>
    (`/users-config/me`)

  return res.data
}

export async function setConfigApi(config: Config): Promise<void> {
  await axios.post<any, AxiosResponse<void>>
    (`/users-config/me`, config)
}