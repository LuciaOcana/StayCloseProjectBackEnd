import { model, ObjectId, Schema } from "mongoose";
import { userofDB } from './user';

export interface postInterface{
    //postID: string, *¿PONEMOS UNA ID NOSOTRAS O ESCOGEMOS LA QUE ASIGNA MONGO POR DEFECTO?* 
    author: Schema.Types.ObjectId,
    postType: string,
    content: string,
    image: string,
    postDate: Date
}

export type newPostInfo = Omit<postInterface,'id'>

export const postSchema = new Schema<postInterface>({
    author: { type: Schema.Types.ObjectId, ref: 'user', required: true },
    postType: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    postDate: { type: Date, required: true }
})

export const postofDB = model<postInterface>('post',postSchema)