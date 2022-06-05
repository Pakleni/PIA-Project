import express from "express";
import Racun from "../models/racun";

export class RacunController {
  get = async (req: express.Request, res: express.Response) => {
    try {
      const racuni = await Racun.find({ otvoren: false });
      return res.status(200).json(racuni);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  predracun = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, data } = req.body;

      await new Racun({
        firma: _id,
        ...data,
        otvoren: true,
      }).save();

      return res.status(200).json({ message: "success" });
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  edit_predracun = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, data } = req.body;

      const racun = await Racun.findOneAndUpdate(
        {
          _id,
          otvoren: true,
        },
        data
      );

      if (racun) {
        return res.status(200).json({ message: "success" });
      } else {
        return res.status(400).json({ message: "failed" });
      }
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  get_predracun = async (req: express.Request, res: express.Response) => {
    try {
      const { _id } = req.query;

      const racuni = await Racun.find({ firma: _id, otvoren: true });
      return res.status(200).json(racuni);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  napravi = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, data } = req.body;

      await new Racun({
        firma: _id,
        ...data,
        otvoren: false,
      }).save();

      return res.status(200).json({ message: "success" });
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
}
