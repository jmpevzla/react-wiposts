//import type { User } from "@/app/user/domain/userEntity"

export interface AuthData {
  token: string,
  user: Record<string, any>
}