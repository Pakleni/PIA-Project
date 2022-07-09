import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface IKategorija {
  firma: string;
  naziv: string;
}

const kategorijaSchema = new Schema<IKategorija>({
  firma: { type: String, required: true },
  naziv: { type: String, required: true },
});

export default mongoose.model<IKategorija>(
  "Kategorija",
  kategorijaSchema,
  "kategorije"
);
