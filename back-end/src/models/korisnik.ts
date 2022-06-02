import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IKorisnik {
  username: string;
  password: string;
  type: string;
  broj_lk?: string;
  ime?: string;
  prezime?: string;
  telefon?: string;
}

const korisnikSchema = new Schema<IKorisnik>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  broj_lk: { type: String, unique: true, sparse: true },
  ime: { type: String, required: true },
  prezime: { type: String, required: true },
  telefon: { type: String, required: true },
});

export default mongoose.model<IKorisnik>(
  "Korisnik",
  korisnikSchema,
  "korisnici"
);
