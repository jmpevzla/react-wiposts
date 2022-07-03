import type { AuthData } from "./authEntity"

export interface TResponse<T = any> {
  info: T | null
}
export type TAuthResponse = TResponse<AuthData>
export interface Photo {
  photo: string
}
export type PhotoResponse = TResponse<Photo>


