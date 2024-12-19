import { model, Schema } from "mongoose";

export interface ubiInterface {
  name: string;
  horari: string;
  tipo: string;
  ubication: {
    type: string;  // 'Point'
    coordinates: [number, number];  // [longitud, latitud]
  };
  address: string;
  comentari: string;
}

export type newUbiInfo = Omit<ubiInterface, 'id'>;

export const ubiSchema = new Schema<ubiInterface>({
  name: { type: String, required: true },
  horari: { type: String, required: true },
  tipo: { type: String, required: true },
  ubication: {
    type: { type: String, default: 'Point' }, // Tipo "Point" para GeoJSON
    coordinates: { type: [Number], required: true } // Coordenadas: [longitud, latitud]
  },
  address: { type: String, required: true },
  comentari: { type: String, required: true }
});

// Crear un índice geoespacial 2dsphere para el campo 'ubication'
ubiSchema.index({ ubication: '2dsphere' });

export const ubifDB = model<ubiInterface>('ubi', ubiSchema);
