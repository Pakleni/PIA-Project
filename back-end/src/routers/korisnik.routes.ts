import express from "express";
import { KorisnikController } from "../controllers/korisnik.controller";

const korinsikRouter = express.Router();

korinsikRouter
  .route("/login")
  .post((req, res) => new KorisnikController().login(req, res));

korinsikRouter
  .route("/admin/signup")
  .post((req, res) => new KorisnikController().admin_signup(req, res));

export default korinsikRouter;
