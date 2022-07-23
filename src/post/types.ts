import type { TResponse } from '@/api/apiTypes'

export interface PostCheckedDraft {
  id: number;
  status: string;
  photo: string;
}

export interface PostCreated {
  id: number;
}
export interface Post {
  id: number;
  photo: string;
  photoDatetime: string;
  description: string;
  hashtags: string;
  status: string;
}

export interface PostPhoto {
  photo: string;
}

export interface PostUserShow {
  id: number;
  name: string;
  photo: string;
  username: string;
}
export interface PostShow extends Post {
  user: PostUserShow;
  createdAt: string;
}

export type PostInfo = Omit<Post, "id" | "photo" | "status">

export type PostCheckedDraftResponse = TResponse<PostCheckedDraft>
export type PostCreatedResponse = TResponse<PostCreated>
export type PostResponse = TResponse<Post>
export type PostPhotoResponse = TResponse<PostPhoto>
export type PostShowResponse = TResponse<PostShow>

// export type ProfileEdit = Omit<Profile, 'username' | 'email' | 'photo'>
