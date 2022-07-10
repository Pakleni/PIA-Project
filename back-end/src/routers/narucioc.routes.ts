import express from "express";
import { NaruciocController } from "../controllers/narucioc.controller";

const naruciocRouter = express.Router();

naruciocRouter
  .route("/")
  .get((req, res) => new NaruciocController().get(req, res));

naruciocRouter
  .route("/all")
  .get((req, res) => new NaruciocController().getAll(req, res));

naruciocRouter
  .route("/")
  .post((req, res) => new NaruciocController().add(req, res));

export default naruciocRouter;
