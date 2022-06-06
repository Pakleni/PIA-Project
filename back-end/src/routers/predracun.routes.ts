import express from "express";
import { PredracunController } from "../controllers/predracun.controller";

const predracunRouter = express.Router();

predracunRouter
  .route("/")
  .get((req, res) => new PredracunController().get(req, res));

predracunRouter
  .route("/")
  .post((req, res) => new PredracunController().add(req, res));

predracunRouter
  .route("/")
  .put((req, res) => new PredracunController().edit(req, res));

export default predracunRouter;
