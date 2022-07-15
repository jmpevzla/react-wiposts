import type { AxiosResponse } from "axios";
import type { ChangePassword, ProfileEdit, ProfileResponse
  ,ProfileShowResponse } from "../types";

import { axios, axiosUpload } from '@/api/getAxios'
import { PhotoResponse } from "@/api/apiTypes";

export async function getProfileApi(): Promise<ProfileResponse> {
  const res = await axios.get<any, AxiosResponse<ProfileResponse>>
    (`/users`)

  return res.data
}

export async function getProfileByUsernameApi(username: string): Promise<ProfileShowResponse> {
  const res = await axios.get<any, AxiosResponse<ProfileShowResponse>>
    (`/users/username/${username}`)

  return res.data
}

export async function editProfileApi(profile: ProfileEdit): Promise<ProfileResponse> {
  const res = await axios.put<any, AxiosResponse<ProfileResponse>, ProfileEdit>
    (`/users/info`, profile)

  return res.data
}

export async function changePasswordApi(data: ChangePassword): Promise<void> {
  await axios.put<any, AxiosResponse<void>, ChangePassword>
    (`/users/change-password`, data)
}

export async function uploadPhotoApi(photo: File): Promise<PhotoResponse> {
  const formData = new FormData()
  formData.append('photo', photo)

  const res = await axiosUpload.put<any, AxiosResponse<PhotoResponse>, FormData>
    (`/users/photo`, formData)

  return res.data
}