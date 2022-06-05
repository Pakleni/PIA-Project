import express from "express";
import { RacunController } from "../controllers/racun.controller";

const racunRouter = express.Router();

racunRouter.route("/").get((req, res) => new RacunController().get(req, res));

racunRouter
  .route("/")
  .post((req, res) => new RacunController().napravi(req, res));

racunRouter
  .route("/predracuni")
  .get((req, res) => new RacunController().get_predracun(req, res));

racunRouter
  .route("/predracuni")
  .post((req, res) => new RacunController().predracun(req, res));

racunRouter
  .route("/predracuni")
  .put((req, res) => new RacunController().edit_predracun(req, res));

export default racunRouter;
