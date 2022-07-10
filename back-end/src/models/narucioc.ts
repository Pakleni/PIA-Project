import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface INarucioc {
  firma: string;
  ime: string;
  prezime: string;
  telefon: string;
  email: string;
  naziv: string;
  drzava: string;
  grad: string;
  postanski_broj: string;
  ulica_broj: string;
  pib: string;
  maticni_broj: string;
  broj_dana: string;
  procenat_rabata: string;
}

const naruciocSchema = new Schema<INarucioc>({
  firma: { type: String, required: true },
  ime: { type: String, required: true },
  prezime: { type: String, required: true },
  telefon: { type: String, required: true },
  email: { type: String, required: true },
  naziv: { type: String, required: true },
  drzava: { type: String, required: true },
  grad: { type: String, required: true },
  postanski_broj: { type: String, required: true },
  ulica_broj: { type: String, required: true },
  pib: { type: String, required: true },
  maticni_broj: { type: String, required: true },
  broj_dana: { type: String, required: true },
  procenat_rabata: { type: String, required: true },
});

export default mongoose.model<INarucioc>(
  "Narucioc",
  naruciocSchema,
  "narucioci"
);
