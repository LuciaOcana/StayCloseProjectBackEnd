import { model, Schema } from "mongoose";


export interface postInterface{
    author: string,
    postType: string,
    content: string,
    image?: string,
    postDate: Date
}

export type newPostInfo = Omit<postInterface,'id'>

export const postSchema = new Schema<postInterface>({
    author: { type: String, required: true },
    postType: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: false },
    postDate: { type: Date, required: false }
})

export const postofDB = model<postInterface>('post',postSchema)