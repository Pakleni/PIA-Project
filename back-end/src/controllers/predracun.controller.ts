import express from "express";
import Predracun from "../models/predracun";
import Racun from "../models/racun";

export class PredracunController {
  add = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, data } = req.body;

      await new Predracun({
        firma: _id,
        ...data,
      }).save();

      return res.status(200).json({ message: "success" });
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  edit = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, data } = req.body;

      const racun = await Predracun.findOneAndUpdate(
        {
          _id,
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

  get = async (req: express.Request, res: express.Response) => {
    try {
      const { _id } = req.query;

      const racuni = await Predracun.find({ firma: _id });
      return res.status(200).json(racuni);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  close = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, racun_id, data } = req.body;

      const predracun = await Predracun.findById(racun_id);

      if (predracun) {
        await new Racun({
          firma: _id,
          ...predracun,
          ...data,
          datum: Date.now(),
        }).save();

        await Predracun.findByIdAndDelete(racun_id);

        return res.status(200).json({ message: "success" });
      } else {
        return res.status(400).json({ message: "failed to find racun" });
      }
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
}
