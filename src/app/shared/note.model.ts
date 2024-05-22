export interface Note {
    userId?: number;
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    lastUpdated: Date;
}

export class Note {
    userId?: number;
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    lastUpdated: Date;

    constructor(data: Note) {
        Object.assign(this, data);
    }
}