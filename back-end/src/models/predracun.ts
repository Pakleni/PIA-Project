import mongoose from "mongoose";
import { IStavka, stavkaSchema } from "./racun";

const Schema = mongoose.Schema;

interface IPredracun {
  firma: string;
  stavke: IStavka[];
  sto?: string;
}

const predracunSchema = new Schema<IPredracun>({
  firma: { type: String, required: true },
  stavke: { type: [stavkaSchema], sparse: true },
  sto: { type: String, required: true, unique: true },
});

export default mongoose.model<IPredracun>(
  "Predracun",
  predracunSchema,
  "predracuni"
);
