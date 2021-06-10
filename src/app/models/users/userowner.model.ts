import { Tag } from "./tag.model";

export interface UserOwner {
    owner?: {
        _id: string,
    },
    name: string,
    email: string,
    password: string,
    role?: string,
    _id?: string,
    tags?: Tag[]
}