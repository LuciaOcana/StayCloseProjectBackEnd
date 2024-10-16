import { model, Schema } from "mongoose";

export interface userInterface{
    username: string,
    name: string,
    email: string,
    password: string,
    actualUbication: [],
    inHome: boolean,
    admin: boolean
}

export type UsersInterfacePublicInfo = Pick<userInterface, 'username' | 'name' >
export type newUserInfo = Omit<userInterface,'id'>
export type login = Pick<userInterface, 'username' | 'password' >

export const userSchema = new Schema<userInterface>({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    actualUbication: [],
    inHome: { type: Boolean},
    admin: {type: Boolean}
       
    //experiences: [{ type: Schema.Types.ObjectId, ref: 'experiencias' }] // Vector de experiencias con referencia a su modelo
})

export const userofDB = model<userInterface>('user',userSchema)