import type { AxiosResponse } from "axios"
import { Photo, PhotoResponse } from "../apiTypes"

export default responsePhotoInterceptor

function responsePhotoInterceptor(response: AxiosResponse<PhotoResponse>) { 
  const photoPost: Photo | null = response.data.info

  if (photoPost && photoPost.photo) {
    response.data.info = {
      ...photoPost,
      photo: `${response.config.baseURL}/${photoPost.photo}`
    }
  }
  
  return response
}