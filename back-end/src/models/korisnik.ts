import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IRacun {
  broj: string;
  banka: string;
}

interface IMagacin {
  id: string;
  naziv: string;
}

interface IKasa {
  lokacija: string;
  tip: string;
}

interface IKorisnik {
  username: string;
  password: string;
  type: string;
  broj_lk?: string;
  ime?: string;
  prezime?: string;
  telefon?: string;
  email?: string;
  naziv?: string;
  adresa?: string;
  pib?: string;
  maticni_broj?: string;
  kategorija?: string;
  sifra_delatnosti?: number[];
  pdv?: boolean;
  racuni?: IRacun[];
  magacini?: IMagacin[];
  kase?: IKasa[];
  // grb: null;
}

const magacinSchema = new Schema<IMagacin>({
  id: { type: String, required: true },
  naziv: { type: String, required: true },
});

const kasaSchema = new Schema<IKasa>({
  lokacija: { type: String, required: true },
  tip: { type: String, required: true },
});

const racunSchema = new Schema<IRacun>({
  broj: { type: String, required: true },
  banka: { type: String, required: true },
});

const korisnikSchema = new Schema<IKorisnik>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  type: { type: String, required: true },
  broj_lk: { type: String, sparse: true, unique: true },
  ime: { type: String, sparse: true },
  prezime: { type: String, sparse: true },
  telefon: { type: String, sparse: true },
  email: { type: String, sparse: true, unique: true },
  naziv: { type: String, sparse: true },
  adresa: { type: String, sparse: true },
  pib: { type: String, sparse: true },
  maticni_broj: { type: String, sparse: true },
  kategorija: { type: String, sparse: true },
  sifra_delatnosti: { type: [Number], sparse: true },
  pdv: { type: Boolean, sparse: true },
  racuni: { type: [racunSchema], sparse: true },
  magacini: { type: [magacinSchema], sparse: true },
  kase: { type: [kasaSchema], sparse: true },
  // grb: null,
});

export default mongoose.model<IKorisnik>(
  "Korisnik",
  korisnikSchema,
  "korisnici"
);
