import express from "express";
import { KategorijaController } from "../controllers/kategorija.controller";

const kategorijaRouter = express.Router();

kategorijaRouter
  .route("/")
  .post((req, res) => new KategorijaController().add(req, res));

kategorijaRouter
  .route("/")
  .get((req, res) => new KategorijaController().get(req, res));

export default kategorijaRouter;
