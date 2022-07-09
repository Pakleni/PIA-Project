import express from "express";
import Korisnik from "../models/korisnik";
import Kategorija from "../models/kategorija";

export class KategorijaController {
  get = async (req: express.Request, res: express.Response) => {
    try {
      const { _id } = req.query;
      const artikli = _id
        ? await Kategorija.find({
            firma: _id,
          })
        : await Kategorija.find({});
      return res.status(200).json(artikli);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
  add = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, naziv } = req.body;

      const korisnik = await Korisnik.findOne({ _id });

      if (korisnik) {
        const kat = await Kategorija.findOne({ firma: _id, naziv });

        if (!kat) {
          await new Kategorija({
            firma: _id,
            naziv,
          }).save();
        } else {
          return res.status(400).json({ message: "exists" });
        }
        return res.status(200).json({ message: "success" });
      } else return res.status(400).json({ message: "user failed" });
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
}
