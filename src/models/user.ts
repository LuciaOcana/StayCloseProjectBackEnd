import { model, Schema } from "mongoose";

export interface userInterface{
    username: string,
    name: string,
    email: string,
    password: string,
    actualUbication: [],
    inHome: boolean,
}

export type UsersInterfacePublicInfo = Pick<userInterface, 'username' | 'name' >
export type newUserInfo = Omit<userInterface,'id'>

export const userSchema = new Schema<userInterface>({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    actualUbication: [],
    inHome: { type: Boolean, required: true },
       
    //experiences: [{ type: Schema.Types.ObjectId, ref: 'experiencias' }] // Vector de experiencias con referencia a su modelo
})

export const userofDB = model<userInterface>('user',userSchema)