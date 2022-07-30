import type { AxiosResponse } from "axios";
import type { PostApiSearch, PostListArrayResponse
  , PostSearch, PostsListResponse } from "../types";
import { produce } from 'immer'
import { axios } from '@/api/getAxios'
import { formatDate } from "@/shared/dates";

export async function getPostsApi(data: PostSearch): Promise<PostsListResponse> {
  const params: PostApiSearch = {} 
  
  params.q = data.search === '' ? undefined : data.search

  // sort
  const sort = data.sort.filter(value => {
    const key = Object.keys(value)[0]
    return value[key] !== ''
  })
 
  params._sort = sort.map(value => {
    return Object.keys(value)[0] 
  }).join() 
  
  params._order = sort.map(value => {
    return Object.values(value)[0] 
  }).join() 

  const res = await axios.get<any, AxiosResponse<PostListArrayResponse>>
    (`/posts/search`, { params })

  const posts = res.data.info!.map((value) => {
    return produce(value, (draft) => {
      draft.photo = `${axios.defaults.baseURL}/${draft.photo}`
      draft.user.photo = `${axios.defaults.baseURL}/${draft.user.photo}`
      draft.createdAt = formatDate(draft.createdAt)
      draft.updatedAt = formatDate(draft.updatedAt)
      draft.photoDatetime = formatDate(draft.photoDatetime)
    })
  })

  return { 
    info: {
      posts,
      total: Number(res.headers['x-total-count'])
    }
  }
}
