import express from "express";
import mongoose from "mongoose";
import Korisnik from "../models/korisnik";
import Zahtev from "../models/zahtev";

export class ZahtevController {
  get = async (req: express.Request, res: express.Response) => {
    try {
      const { username, password } = req.query;
      const korisnik = await Korisnik.findOne({ username, password });
      if (korisnik) {
        const zahtevi = await Zahtev.find();
        return res.status(200).json(zahtevi);
      } else return res.sendStatus(401);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  respond = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, username, password, status } = req.body;
      const korisnik = await Korisnik.findOne({ username, password });
      if (korisnik) {
        if (status) {
          const session = await mongoose.startSession();
          try {
            let response = {
              status: 400,
              message: "Error!",
            };
            await session.withTransaction(async () => {
              const zahtev = await Zahtev.findByIdAndDelete(_id);

              if (zahtev) {
                await new Korisnik({
                  username: zahtev.username,
                  password: zahtev.password,
                  ime: zahtev.ime,
                  prezime: zahtev.prezime,
                  telefon: zahtev.telefon,
                  email: zahtev.email,
                  naziv: zahtev.naziv,
                  drzava: zahtev.drzava,
                  grad: zahtev.grad,
                  postanski_broj: zahtev.postanski_broj,
                  ulica_broj: zahtev.ulica_broj,
                  pib: zahtev.pib,
                  maticni_broj: zahtev.maticni_broj,
                  grb: zahtev.grb,
                  type: "Company",
                  odeljenja: [],
                }).save();

                response = {
                  status: 200,
                  message: "Success!",
                };
              }
            });
            return res
              .status(response.status)
              .json({ message: response.message });
          } catch (e) {
            return res.status(400).json({ message: e.toString() });
          } finally {
            await session.endSession();
          }
        } else {
          const zahtev = await Zahtev.findByIdAndDelete(_id);
          if (zahtev) {
            return res.status(200).json({ message: "success" });
          } else {
            return res.status(400).json({ message: "failed" });
          }
        }
      } else return res.sendStatus(401);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
}
