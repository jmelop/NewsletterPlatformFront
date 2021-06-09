import { Admin } from "../admin/admin.model";
import { User } from "./user.model"

export interface SessionUser {
    token: string,
    user: User
}

export interface SessionAdmin {
    token: string,
    user: Admin
}

