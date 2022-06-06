import express from "express";
import Racun from "../models/racun";

export class RacunController {
  get = async (req: express.Request, res: express.Response) => {
    try {
      const racuni = await Racun.find();
      return res.status(200).json(racuni);
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
