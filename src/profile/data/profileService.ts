import type { AxiosResponse } from "axios";
import type { ChangePassword, ProfileEdit, ProfileResponse
  ,ProfileShowResponse } from "../types";

import { axios, axiosUpload } from '@/api/getAxios'
import { PhotoResponse } from "@/api/apiTypes";

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
    (`/profile/edit`, profile)

  return res.data
}

export async function changePasswordApi(data: ChangePassword): Promise<void> {
  await axios.put<any, AxiosResponse<void>, ChangePassword>
    (`/profile/change-password`, data)
}

export async function uploadPhotoApi(photo: File): Promise<PhotoResponse> {
  const formData = new FormData()
  formData.append('photo', photo)

  const res = await axiosUpload.put<any, AxiosResponse<PhotoResponse>, FormData>
    (`/profile/photo`, formData)

  return res.data
}