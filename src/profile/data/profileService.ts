import type { AxiosResponse } from "axios";
import type { ChangeEmail, ChangePassword
  , ProfileEdit, ProfileResponse
  ,ProfileShowResponse } from "../types";

import { axios, axiosUpload } from '@/api/getAxios'
import { PhotoResponse } from "@/api/apiTypes";

export async function getProfileApi(): Promise<ProfileResponse> {
  const res = await axios.get<any, AxiosResponse<ProfileResponse>>
    (`/users/me`)

  return res.data
}

export async function getProfileByUsernameApi(username: string): Promise<ProfileShowResponse> {
  const res = await axios.get<any, AxiosResponse<ProfileShowResponse>>
    (`/users/user/${username}`)

  return res.data
}

export async function editProfileApi(profile: ProfileEdit): Promise<ProfileResponse> {
  const res = await axios.put<any, AxiosResponse<ProfileResponse>, ProfileEdit>
    (`/users/me/info`, profile)

  return res.data
}

export async function changePasswordApi(data: ChangePassword): Promise<void> {
  await axios.put<any, AxiosResponse<void>, ChangePassword>
    (`/users/me/change-password`, data)
}

export async function uploadPhotoApi(photo: File): Promise<PhotoResponse> {
  const formData = new FormData()
  formData.append('photo', photo)

  const res = await axiosUpload.put<any, AxiosResponse<PhotoResponse>, FormData>
    (`/users/me/photo`, formData)

  return res.data
}

export async function changeEmailApi(data: ChangeEmail): Promise<void> {
  await axios.post<any, AxiosResponse<void>, ChangeEmail>
    (`/users/me/change-email`, data)
}

export async function verifyEmailApi(token: string): Promise<void> {
  await axios.post<any, AxiosResponse<void>, ChangeEmail>
    (`/auth/verify-email/${token}`)
}
