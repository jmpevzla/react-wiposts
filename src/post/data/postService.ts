import type { AxiosResponse } from "axios";
import type { PostCheckedDraftResponse
  , PostCreatedResponse, PostInfo, PostResponse } from "../types";

import { axios, axiosUpload } from '@/api/getAxios'
import { PhotoResponse } from "@/api/apiTypes";

export async function checkDraftPostApi(): Promise<PostCheckedDraftResponse> {
  const res = await axios.get<any, AxiosResponse<PostCheckedDraftResponse>>
    (`/posts/check-draft`)

  return res.data
}

export async function createPostApi(): Promise<PostCreatedResponse> {
  const res = await axios.post<any, AxiosResponse<PostCreatedResponse>>
    (`/posts/create`)

  return res.data
}

export async function createPostPhotoApi(id:number, photo: File): Promise<PhotoResponse> {
  const formData = new FormData()
  formData.append('photo', photo)

  const res = await axiosUpload.put<any, AxiosResponse<PhotoResponse>, FormData>
    (`/posts/create/${id}/photo`, formData)

  return res.data
}

export async function createPostInfoApi(id: number, data: PostInfo): Promise<void> {
  const res = await axios.put<any, AxiosResponse<void>>
    (`/posts/create/${id}/info`, data)

  return res.data
}

export async function deletePostApi(id: number): Promise<void> {
  const res = await axios.delete<any, AxiosResponse<void>>
    (`/posts/remove/${id}`)

  return res.data
}

export async function postDataApi(id: number): Promise<PostResponse> {
  const res = await axios.get<any, AxiosResponse<PostResponse>>
    (`/posts/data/${id}`)

  return res.data
}

export async function editPostApi(id: number, data: PostInfo): Promise<void> {
  const res = await axios.put<any, AxiosResponse<void>>
    (`/posts/edit/${id}`, data)

  return res.data
}