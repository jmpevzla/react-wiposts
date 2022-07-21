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

export type PostInfo = Omit<Post, "id" | "photo" | "status">

export type PostCheckedDraftResponse = TResponse<PostCheckedDraft>
export type PostCreatedResponse = TResponse<PostCreated>
export type PostResponse = TResponse<Post>

// export interface Profile {
//   username: string,
//   email: string,
//   name: string,
//   phone: string,
//   birthday: string,
//   gender: string,
//   description: string,
//   website: string,
//   photo: string
// }

// export interface ProfileShow {
//   username: string,
//   name: string,
//   numPosts: number,
//   description: string,
//   website: string,
//   photo: string
// }

// export interface ChangePassword {
//   oldPassword: string,
//   newPassword: string,
//   confNewPassword: string
// }

// export type ProfileResponse = TResponse<Profile>
// export type ProfileEdit = Omit<Profile, 'username' | 'email' | 'photo'>
//export type ProfileShowResponse = TResponse<ProfileShow>