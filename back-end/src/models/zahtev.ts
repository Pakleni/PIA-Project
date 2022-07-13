import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IZahtev {
  username: string;
  password: string;
  ime?: string;
  prezime?: string;
  telefon?: string;
  email?: string;
  naziv?: string;
  pib?: string;
  maticni_broj?: string;
  drzava?: string;
  grad?: string;
  postanski_broj?: string;
  ulica_broj?: string;
  grb: string;
  status: string;
}

const zahtevSchema = new Schema<IZahtev>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  status: { type: String, required: true },
  ime: { type: String, sparse: true },
  prezime: { type: String, sparse: true },
  telefon: { type: String, sparse: true },
  email: { type: String, sparse: true, unique: true },
  naziv: { type: String, sparse: true },
  pib: { type: String, sparse: true },
  drzava: { type: String, sparse: true },
  grad: { type: String, sparse: true },
  postanski_broj: { type: String, sparse: true },
  ulica_broj: { type: String, sparse: true },
  maticni_broj: { type: String, sparse: true },
  grb: { type: String, sparse: true },
});

export default mongoose.model<IZahtev>("Zahtev", zahtevSchema, "zahtevi");
