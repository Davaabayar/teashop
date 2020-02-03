export interface Post {
    _id: string,
    title: string,
    summary: string,
    thumbnail: string,
    body: string,
    created: Date,
    updated?: Date,
    createdBy: string,
    updatedBy?: string,
    status: number
}
