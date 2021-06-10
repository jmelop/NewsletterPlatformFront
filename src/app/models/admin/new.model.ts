import { Tag } from "./tag.model";

export class New {
    title: string;
    body: string;
    link: string;
    tag: Tag[];
    owner: string;
    _id?: string;
    editable?: boolean;
}
