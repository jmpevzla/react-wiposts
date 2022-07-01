import type { AxiosResponse } from "axios";
import type { ProfileEdit, ProfileResponse
  ,ProfileShowResponse } from "../types";

import { axios } from '@/api/getAxios'

export async function getProfileFullApi(): Promise<ProfileResponse> {
  const res = await axios.get<any, AxiosResponse<ProfileResponse>>
    (`/users/1`)

  return res.data
}

export async function getProfileApi(id: number): Promise<ProfileShowResponse> {
  const res = await axios.get<any, AxiosResponse<ProfileShowResponse>>
    (`/users/${id}`)

  return res.data
}

export async function editProfileApi(profile: ProfileEdit): Promise<ProfileResponse> {
  const res = await axios.put<any, AxiosResponse<ProfileResponse>, ProfileEdit>
    (`/users/1`, profile)

  return res.data
}