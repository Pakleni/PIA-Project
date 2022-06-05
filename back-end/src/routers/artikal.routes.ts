import express from "express";
import { ArtikalController } from "../controllers/artikal.controller";

const artikalRouter = express.Router();

artikalRouter
  .route("/")
  .post((req, res) => new ArtikalController().add(req, res));

artikalRouter
  .route("/")
  .get((req, res) => new ArtikalController().get(req, res));

artikalRouter
  .route("/")
  .put((req, res) => new ArtikalController().edit(req, res));

artikalRouter
  .route("/")
  .delete((req, res) => new ArtikalController().delete(req, res));

export default artikalRouter;
