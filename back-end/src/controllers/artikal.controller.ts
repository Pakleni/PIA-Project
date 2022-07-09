import express from "express";
import Korisnik from "../models/korisnik";
import Artikal from "../models/artikal";
import fileUpload from "express-fileupload";
import path from "path";

export class ArtikalController {
  get = async (req: express.Request, res: express.Response) => {
    try {
      const { _id } = req.query;
      const artikli = _id
        ? await Artikal.find({
            user: _id,
          })
        : await Artikal.find({});
      return res.status(200).json(artikli);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
  add = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, data: got_data } = req.body;
      const parsed_data = JSON.parse(got_data);

      let slicica_path;

      if (!req.files || Object.keys(req.files).length === 0) {
        slicica_path = "http://localhost:4000/files/no_img.png";
      } else {
        const slicica = req.files.slicica as fileUpload.UploadedFile;

        const upload_path = path.join(
          __dirname,
          `.././public/uploads/${_id}-${parsed_data.sifra}-${slicica.name}`
        );

        try {
          await slicica.mv(upload_path);
        } catch (e) {
          console.log("[server] ", e);
          return res.status(400).json({ message: "failed" });
        }
        slicica_path = `http://localhost:4000/files/uploads/${_id}-${parsed_data.sifra}-${slicica.name}`;
      }

      const data = {
        ...parsed_data,
        slicica: slicica_path,
      };

      const korisnik = await Korisnik.findOne({ _id });

      if (korisnik) {
        await new Artikal({
          user: _id,
          ...data,
        }).save();
        return res.status(200).json({ message: "success" });
      } else return res.status(400).json({ message: "user failed" });
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  edit = async (req: express.Request, res: express.Response) => {
    try {
      const { user, _id, data: got_data } = req.body;
      const parsed_data = JSON.parse(got_data);
      let data: any;

      if (!req.files || Object.keys(req.files).length === 0) {
        data = parsed_data;
      } else {
        const slicica = req.files.slicica as fileUpload.UploadedFile;

        const upload_path = path.join(
          __dirname,
          `.././public/uploads/${_id}-${parsed_data.sifra}-${slicica.name}`
        );

        try {
          await slicica.mv(upload_path);
        } catch (e) {
          console.log("[server] ", e);
          return res.status(400).json({ message: "failed" });
        }
        data = {
          ...parsed_data,
          slicica: `http://localhost:4000/files/uploads/${_id}-${parsed_data.sifra}-${slicica.name}`,
        };
      }

      //Remove falsey values
      Object.keys(data).forEach((key) => {
        if (!data[key]) {
          delete data[key];
        }
      });

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

  dodeli = async (req: express.Request, res: express.Response) => {
    try {
      const { user, _id, kategorija } = req.body;

      const artikal = await Artikal.findOne({ user, _id });

      if (!artikal) {
        return res.status(400).json({ message: "no such article" });
      }

      if (!artikal.kategorija) {
        await Artikal.findOneAndUpdate({ user, _id }, { kategorija });
      } else {
        return res.status(400).json({ message: "vec ima kategoriju" });
      }

      return res.status(200).json({ message: "success" });
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
}
