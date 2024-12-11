import { model, Schema, } from "mongoose";

export interface ubiInterface{
   name: string,
   horari: string,
   tipo: string,
   ubication:{
    latitud: number,
    longitud: number
   },
   address: string,
   comentari: string
}

export type newUbiInfo = Omit<ubiInterface,'id'>

export const ubiSchema = new Schema<ubiInterface>({
    name: { type: String, required: true },
    horari: { type: String, required: true },
    tipo:{ type: String, required: true },   
    ubication:{
        latitud: { type: Number, required: true },   
        longitud: { type: Number, required: true }   
    },
    address:{ type: String, required: true }, 
    comentari: { type: String, required: true }
})

export const ubifDB = model<ubiInterface>('ubi', ubiSchema);
