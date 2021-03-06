import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IStavka {
  naziv_artikla: string;
  kolicina: number;
  prodajna_cena: number;
  porez: string;
  sifra: string;
}

interface IRacun {
  magacin_id?: string;
  firma: string;
  stavke: IStavka[];
  nacin?: "gotovina" | "cek" | "kartica" | "virman";
  vrednost?: number;
  ime?: string;
  prezime?: string;
  broj_lk?: string;
  broj_slip_racuna?: string;
  narucioc?: string;
  datum: number;
}

export const stavkaSchema = new Schema<IStavka>({
  sifra: { type: String, required: true },
  naziv_artikla: { type: String, required: true },
  kolicina: { type: Number, required: true },
  prodajna_cena: { type: Number, required: true },
  porez: { type: String, required: true },
});

const racunSchema = new Schema<IRacun>({
  magacin_id: { type: String, required: true },
  firma: { type: String, required: true },
  stavke: { type: [stavkaSchema], sparse: true },
  nacin: { type: String, sparse: true },
  vrednost: { type: Number, sparse: true },
  ime: { type: String, sparse: true },
  prezime: { type: String, sparse: true },
  broj_lk: { type: String, sparse: true },
  broj_slip_racuna: { type: String, sparse: true },
  narucioc: { type: String, sparse: true },
  datum: { type: Number, required: true },
});

export default mongoose.model<IRacun>("Racun", racunSchema, "racuni");
