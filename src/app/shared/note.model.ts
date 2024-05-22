import { Tag } from "./tag.model";

export interface Note {
    userId?: number;
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    lastUpdated: Date;
    tags: Tag[]
}