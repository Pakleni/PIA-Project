import express from "express";
import { KorisnikController } from "../controllers/korisnik.controller";

const korinsikRouter = express.Router();

korinsikRouter
  .route("/login")
  .post((req, res) => new KorisnikController().login(req, res));

export default korinsikRouter;
