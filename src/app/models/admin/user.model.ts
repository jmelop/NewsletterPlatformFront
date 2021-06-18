import { Tag } from "./tag.model";

export class User {
    name: string;
    email: string;
    owner: any;
    tags: Tag[];
    password: string;
    _id?: string
    editable?: boolean;
    createdAt?: string;
}

