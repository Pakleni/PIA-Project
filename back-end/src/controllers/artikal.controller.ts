import express from "express";
import Korisnik from "../models/korisnik";
import Artikal from "../models/artikal";

export class ArtikalController {
  get = async (req: express.Request, res: express.Response) => {
    try {
      const { _id } = req.query;
      const artikli = await Artikal.find({
        user: _id,
      });
      return res.status(200).json(artikli);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
  add = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, data } = req.body;
      const korisnik = await Korisnik.findOne({ _id });

      if (korisnik) {
        await new Artikal({
          user: _id,
          ...data,
        }).save();
        return res.status(200).json({ message: "success" });
      } else return res.status(200).json({ message: "user failed" });
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
  edit = async (req: express.Request, res: express.Response) => {
    try {
      const { user, _id, data } = req.body;
      await Artikal.findOneAndUpdate({ user, _id }, data);
      return res.status(200).json({ message: "success" });
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
  delete = async (req: express.Request, res: express.Response) => {
    try {
      const { user, _id } = req.body;
      const artikal = await Artikal.findOneAndDelete({ user, _id });
      if (artikal) {
        return res.status(200).json({ message: "success" });
      } else {
        return res.status(400).json({ message: "no exist" });
      }
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
}
