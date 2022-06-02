import express from "express";
import Korisnik from "../models/korisnik";

export class KorisnikController {
  login = async (req: express.Request, res: express.Response) => {
    try {
      const { username, password } = req.body;
      const korisnik = await Korisnik.find({ username, password });

      if (korisnik[0]) return res.status(200).json(korisnik[0]);
      else return res.sendStatus(401);
    } catch (e) {
      console.log("[server] " + e);
    }
  };
  admin_signup = async (req: express.Request, res: express.Response) => {
    try {
      const { username, password } = req.body;
      try {
        await new Korisnik({ username, password, type: "Admin" }).save();
        return res.status(200).json({ message: "success" });
      } catch (e) {
        return res.status(400).json({ message: "failed" });
      }
    } catch (e) {
      console.log("[server] " + e);
    }
  };
  change_password = async (req: express.Request, res: express.Response) => {
    try {
      const { username, password, new_password } = req.body;
      const korisnik = await Korisnik.findOneAndUpdate(
        {
          username,
          password,
        },
        { password: new_password }
      );
      if (korisnik) {
        return res.status(200).json({ message: "success" });
      } else {
        return res.status(400).json({ message: "failed" });
      }
    } catch (e) {
      console.log("[server] " + e);
    }
  };
}
