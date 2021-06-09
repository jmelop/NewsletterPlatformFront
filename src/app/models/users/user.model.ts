import { Tag } from "./tag.model";

export interface User {
    owner?: string,
    name: string,
    email: string,
    password: string,
    role?: string,
    _id?: string,
    tags?: Tag[]
}

export interface LogUser {
    email: string,
    password: string,
}