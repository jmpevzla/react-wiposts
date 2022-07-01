import type { TResponse } from '@/api/apiTypes'

export interface Profile {
  username: string,
  email: string,
  name: string,
  phone: string,
  birthday: string,
  gender: string,
  description: string,
  website: string
}

export interface ProfileShow {
  username: string,
  name: string,
  posts: number,
  description: string,
  website: string
}

export type ProfileResponse = TResponse<Profile>
export type ProfileEdit = Omit<Profile, 'username' | 'email'>
export type ProfileShowResponse = TResponse<ProfileShow>