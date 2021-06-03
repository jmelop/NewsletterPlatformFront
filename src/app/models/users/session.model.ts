import { User } from "./user.model"

export interface Session {
    token: string,
    user: User
}
