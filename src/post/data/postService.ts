import type { AxiosResponse } from "axios";
import type { PostCheckedDraftResponse
  , PostCreatedResponse, PostInfo
  , PostPhotoResponse, PostResponse
  , PostShowResponse } from "../types";

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

export async function photoPostApi(id: number): Promise<PostPhotoResponse> {
  const res = await axios.get<any, AxiosResponse<PostPhotoResponse>>
    (`/posts/photo/${id}`)

  return res.data
}

export async function showPostApi(id: number): Promise<PostShowResponse> {
  const res = await axios.get<any, AxiosResponse<PostShowResponse>>
    (`/posts/show/${id}`)

  const info = res.data.info
  const photo = info?.user.photo
  if (photo) {
    info!.user.photo = axios.defaults.baseURL + '/' + photo 
  }
  const options: Intl.DateTimeFormatOptions = 
  { year: 'numeric', month: "2-digit", day: '2-digit',  
  hour: 'numeric', minute: '2-digit', hourCycle: "h23" }
  
  info!.createdAt = new Date(info!.createdAt).toLocaleString([], options)
  info!.photoDatetime = new Date(info!.photoDatetime).toLocaleString([], options)  

  return res.data
}