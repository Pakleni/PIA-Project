import express from "express";
import Narucioc from "../models/narucioc";
import Korisnik from "../models/korisnik";

export class NaruciocController {
  get = async (req: express.Request, res: express.Response) => {
    const { user } = req.query;

    try {
      const narucioci = await Narucioc.find({ firma: user });
      return res.status(200).json(narucioci);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  getAll = async (req: express.Request, res: express.Response) => {
    try {
      const corps = await Korisnik.find({ type: "Company" });
      const nars = await Narucioc.find();

      const corpsMapped = corps.map((x) => ({
        ime: x.ime,
        prezime: x.prezime,
        telefon: x.telefon,
        email: x.email,
        naziv: x.naziv,
        drzava: x.drzava,
        grad: x.grad,
        postanski_broj: x.postanski_broj,
        ulica_broj: x.ulica_broj,
        pib: x.pib,
        maticni_broj: x.maticni_broj,
      }));

      const narsMapped = nars.map((x) => ({
        ime: x.ime,
        prezime: x.prezime,
        telefon: x.telefon,
        email: x.email,
        naziv: x.naziv,
        drzava: x.drzava,
        grad: x.grad,
        postanski_broj: x.postanski_broj,
        ulica_broj: x.ulica_broj,
        pib: x.pib,
        maticni_broj: x.maticni_broj,
      }));

      const all = corpsMapped.concat(narsMapped);

      return res.status(200).json(all);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  add = async (req: express.Request, res: express.Response) => {
    try {
      const { user, data } = req.body;

      const corp = await Korisnik.findOne({
        _id: user,
      });

      if (corp) {
        const nar = await Narucioc.findOne({
          firma: user,
          pib: data.pib,
        });

        if (nar) {
          return res.status(400).json({ message: "already added!" });
        }

        try {
          await new Narucioc({ firma: user, ...data }).save();
          return res.status(200).json({ message: "Success!" });
        } catch (e) {
          return res.status(400).json({ message: "failed" });
        }
      } else {
        return res.status(403).json({ message: "not logged in" });
      }
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
}
