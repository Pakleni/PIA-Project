import express from "express";
import Korisnik from "../models/korisnik";

export class KorisnikController {
  login = async (req: express.Request, res: express.Response) => {
    try {
      const { username, password } = req.body;
      const korisnik = await Korisnik.find({ username, password });

      if (korisnik[0]) res.status(200).json(korisnik[0]);
      else res.sendStatus(401);
    } catch (e) {
      console.log("[server] " + e);
    }
  };
}
