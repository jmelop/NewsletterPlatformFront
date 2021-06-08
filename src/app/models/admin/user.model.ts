import { Tag } from "./tag.model";

export class User {
    name: string;
    email: string;
    role: string;
    tags: Tag[];
    password: string;
    _id?: string
    editable?: boolean;
}

