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
  adresa?: string;
  pib?: string;
  maticni_broj?: string;
  // grb: null;
}

const zahtevSchema = new Schema<IZahtev>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ime: { type: String, sparse: true },
  prezime: { type: String, sparse: true },
  telefon: { type: String, sparse: true },
  email: { type: String, sparse: true, unique: true },
  naziv: { type: String, sparse: true },
  adresa: { type: String, sparse: true },
  pib: { type: String, sparse: true },
  maticni_broj: { type: String, sparse: true },
  // grb: null,
});

export default mongoose.model<IZahtev>("Zahtev", zahtevSchema, "zahtevi");
