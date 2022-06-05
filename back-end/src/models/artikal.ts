import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface ICeneStanje {
  magacin_id: string;
  nabavna_cena: number;
  prodajna_cena: number;
  stanje: number;
  min_zalihe: number;
  max_zalihe: number;
}

interface IArtikal {
  user: string;
  sifra: string;
  naziv: string;
  jedinica: string;
  stopa: string;
  tip?: string;
  poreklo?: string;
  strani_naziv?: string;
  barkod?: string;
  proizvodjac?: string;
  tarifa?: string;
  eko_taksa: boolean;
  akcize: boolean;
  min_zalihe?: number;
  max_zalihe?: number;
  opis?: string;
  deklaracija?: string;
  cene_stanje: ICeneStanje[];
  //slicica
}

const ceneStanjeSchema = new Schema<ICeneStanje>({
  magacin_id: { type: String, required: true },
  nabavna_cena: { type: Number, required: true },
  prodajna_cena: { type: Number, required: true },
  stanje: { type: Number, required: true },
  min_zalihe: { type: Number, required: true },
  max_zalihe: { type: Number, required: true },
});

const artikalSchema = new Schema<IArtikal>({
  user: { type: String, required: true },
  sifra: { type: String, required: true, unique: true },
  naziv: { type: String, required: true },
  jedinica: { type: String, required: true },
  tip: { type: String, sparse: true },
  poreklo: { type: String, sparse: true },
  strani_naziv: { type: String, sparse: true },
  stopa: { type: String, sparse: true },
  barkod: { type: String, sparse: true },
  proizvodjac: { type: String, sparse: true },
  tarifa: { type: String, sparse: true },
  eko_taksa: { type: Boolean, sparse: true },
  akcize: { type: Boolean, sparse: true },
  min_zalihe: { type: Number, sparse: true },
  max_zalihe: { type: Number, sparse: true },
  opis: { type: String, sparse: true },
  deklaracija: { type: String, sparse: true },
  cene_stanje: { type: [ceneStanjeSchema], required: true },
});

export default mongoose.model<IArtikal>("Artikal", artikalSchema, "artikli");
