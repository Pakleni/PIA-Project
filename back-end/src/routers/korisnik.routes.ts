import express from "express";
import { KorisnikController } from "../controllers/korisnik.controller";

const korinsikRouter = express.Router();

korinsikRouter
  .route("/login")
  .post((req, res) => new KorisnikController().login(req, res));

korinsikRouter
  .route("/admin/signup")
  .post((req, res) => new KorisnikController().admin_signup(req, res));

korinsikRouter
  .route("/user/signup")
  .post((req, res) => new KorisnikController().user_signup(req, res));

korinsikRouter
  .route("/corp/signup")
  .post((req, res) => new KorisnikController().corp_signup(req, res));

korinsikRouter
  .route("/change-password")
  .post((req, res) => new KorisnikController().change_password(req, res));

korinsikRouter
  .route("/corp")
  .post((req, res) => new KorisnikController().edit_corp(req, res));
export default korinsikRouter;
