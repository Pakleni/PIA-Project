import mongoose from "mongoose";

const Schema = mongoose.Schema;

interface IStavka {
  naziv_artikla: string;
  magacin_id: string;
  kolicina: number;
  prodajna_cena: number;
  porez: string;
}

interface IPredracun {
  firma: string;
  stavke: IStavka[];
  odeljenje?: string;
  sto?: string;
}

const stavkaSchema = new Schema<IStavka>({
  naziv_artikla: { type: String, required: true },
  magacin_id: { type: String, required: true },
  kolicina: { type: Number, required: true },
  prodajna_cena: { type: Number, required: true },
  porez: { type: String, required: true },
});

const predracunSchema = new Schema<IPredracun>({
  firma: { type: String, required: true },
  stavke: { type: [stavkaSchema], sparse: true },
  odeljenje: { type: String, sparse: true },
  sto: { type: String, sparse: true },
});

export default mongoose.model<IPredracun>(
  "Predracun",
  predracunSchema,
  "predracuni"
);
