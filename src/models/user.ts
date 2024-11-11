import { model, Schema } from "mongoose";

export interface userInterface{
    username: string,
    name: string,
    email: string,
    password: string,
    actualUbication: [],
    inHome: boolean,
    admin: boolean,
    //isEnabled: boolean
    disabled:boolean
}

export type UsersInterfacePublicInfo = Pick<userInterface, 'username' | 'name' >
export type newUserInfo = Omit<userInterface,'id' | 'isEnabled'>
export type login = Pick<userInterface, 'username' | 'password' >

export const userSchema = new Schema<userInterface>({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    actualUbication: [],
    inHome: { type: Boolean},
    admin: {type: Boolean, default: false},
    //isEnabled: {type:Boolean, default: true} //por defecto usuarios habilitados
    disabled:{type:Boolean, default:false},
       
    //experiences: [{ type: Schema.Types.ObjectId, ref: 'experiencias' }] // Vector de experiencias con referencia a su modelo
})

export const userofDB = model<userInterface>('user',userSchema)