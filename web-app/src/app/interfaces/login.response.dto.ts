import { User } from "./user";

export interface LoginResponseDto {
  data: {
    user: User,
    access_token: string
  }
}
