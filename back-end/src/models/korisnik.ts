import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IKorisnik {
  username: string;
  password: string;
  type: string;
}

const korisnikSchema = new Schema<IKorisnik>({
  username: { type: String, required: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
});

export default mongoose.model<IKorisnik>(
  "Korisnik",
  korisnikSchema,
  "korisnici"
);
