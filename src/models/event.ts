import { model, Schema, } from "mongoose";
//import { userofDB } from './user';

export interface eventInterface{
   //eventID: string, *¿PONEMOS UNA ID NOSOTRAS O ESCOGEMOS LA QUE ASIGNA MONGO POR DEFECTO?* 
   name: string,
   description: string,
   date: Date,
   ubication: [],
   creator: Schema.Types.ObjectId
}

export type newEventInfo = Omit<eventInterface,'id'>

export const eventSchema = new Schema<eventInterface>({
    name: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    ubication: [{ type: String }],
    creator: { type: Schema.Types.ObjectId, ref: 'user', required: true }
})

export const eventofDB = model<eventInterface>('event', eventSchema);
