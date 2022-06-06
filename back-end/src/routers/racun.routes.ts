import express from "express";
import { RacunController } from "../controllers/racun.controller";

const racunRouter = express.Router();

racunRouter.route("/").get((req, res) => new RacunController().get(req, res));

racunRouter.route("/").post((req, res) => new RacunController().add(req, res));

export default racunRouter;
