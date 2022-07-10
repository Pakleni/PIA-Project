import express from "express";
import Racun from "../models/racun";
import Korisnik from "../models/korisnik";

export class RacunController {
  get = async (req: express.Request, res: express.Response) => {
    const { _id } = req.query;
    try {
      if (_id) {
        const racuni = await Racun.find({ firma: _id });
        return res.status(200).json(racuni);
      }

      const racuni = await Racun.find();
      return res.status(200).json(racuni);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  getLast5 = async (req: express.Request, res: express.Response) => {
    try {
      const racuni = (await Racun.find().sort({ datum: -1 }).limit(5)).map(
        (x) => JSON.parse(JSON.stringify(x))
      );
      const kompanije = await Korisnik.find();

      const racuni2 = racuni.map((x) => {
        const firma = kompanije.find((y) => y._id.toString() == x.firma);

        return {
          ...x,
          firma: firma.naziv,
          magacin_naziv: firma.magacini.find((y) => y.id == x.magacin_id).naziv,
        };
      });

      return res.status(200).json(racuni2);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  getWithLicna = async (req: express.Request, res: express.Response) => {
    try {
      const { broj_lk } = req.query;

      const racuni = (
        await Racun.find({
          broj_lk,
        })
      ).map((x) => JSON.parse(JSON.stringify(x)));
      const kompanije = await Korisnik.find();

      const racuni2 = racuni.map((x) => {
        const firma = kompanije.find((y) => y._id.toString() == x.firma);

        return {
          ...x,
          firma: firma.naziv,
          magacin_naziv: firma.magacini.find((y) => y.id == x.magacin_id).naziv,
        };
      });

      return res.status(200).json(racuni2);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  add = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, data } = req.body;

      await new Racun({
        firma: _id,
        ...data,
        datum: Date.now(),
      }).save();

      return res.status(200).json({ message: "success" });
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
}
