import express from "express";
import { ZahtevController } from "../controllers/zahtev.controller";

const zahtevRouter = express.Router();

zahtevRouter.route("/").get((req, res) => new ZahtevController().get(req, res));

zahtevRouter
  .route("/")
  .post((req, res) => new ZahtevController().respond(req, res));

export default zahtevRouter;
