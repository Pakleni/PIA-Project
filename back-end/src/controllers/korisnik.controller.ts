import express from "express";
import mongoose from "mongoose";
import Korisnik from "../models/korisnik";
import Zahtev from "../models/zahtev";
import fileUpload from "express-fileupload";
import path from "path";

export class KorisnikController {
  login = async (req: express.Request, res: express.Response) => {
    try {
      const { username, password } = req.body;
      const korisnik = await Korisnik.findOne({ username, password });

      if (korisnik) return res.status(200).json(korisnik);
      else return res.sendStatus(401);
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
  get_corps = async (req: express.Request, res: express.Response) => {
    try {
      const korisnici = await Korisnik.find({ type: "Company" });
      return res.status(200).json(
        korisnici.map((x) => ({
          _id: x._id,
          naziv: x.naziv,
          magacini: x.magacini,
          pib: x.pib,
          grb: x.grb,
        }))
      );
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
  user_signup = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const { user, data } = req.body;

      const admin = await Korisnik.findOne({
        username: user.username,
        password: user.password,
        type: "Admin",
      });
      if (admin)
        try {
          await new Korisnik({ ...data, type: "Buyer" }).save();
          return res.status(200).json({ message: "Success!" });
        } catch (e) {
          return res.status(400).json({ message: "failed" });
        }
      else {
        return res.status(403).json({ message: "not logged in" });
      }
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
  corp_signup = async (
    req: express.Request,
    res: express.Response
  ): Promise<express.Response> => {
    try {
      const { user: got_user, data: got_data } = req.body;

      const user = got_user ? JSON.parse(got_user) : undefined;

      if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send("No files were uploaded.");
      }

      const parsed_data = JSON.parse(got_data);
      const grb_file = req.files.grb as fileUpload.UploadedFile;

      const upload_path = path.join(
        __dirname,
        `.././public/uploads/${parsed_data.username}-${grb_file.name}`
      );

      try {
        await grb_file.mv(upload_path);
      } catch (e) {
        console.log("[server] ", e);
        return res.status(400).json({ message: "failed" });
      }

      const data = {
        ...parsed_data,
        grb: `http://localhost:4000/files/uploads/${parsed_data.username}-${grb_file.name}`,
      };

      if (user) {
        const admin = await Korisnik.findOne({
          username: user.username,
          password: user.password,
          type: "Admin",
        });

        if (admin) {
          try {
            await new Korisnik({ ...data, type: "Company" }).save();
            return res.status(200).json({ message: "Success!" });
          } catch (e) {
            return res.status(400).json({ message: "failed" });
          }
        } else {
          return res.status(403).json({ message: "failed admin" });
        }
      } else {
        const session = await mongoose.startSession();
        try {
          let response = {
            status: 400,
            message: "Error!",
          };
          await session.withTransaction(async () => {
            if (await Korisnik.findOne({ username: data.username })) {
              response = {
                status: 400,
                message: "Username already exists!",
              };
            } else if (await Korisnik.findOne({ email: data.email })) {
              response = {
                status: 400,
                message: "Email already exists!",
              };
            } else {
              await new Zahtev({
                ...data,
                status: "aktivan",
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
      }
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
  admin_signup = async (req: express.Request, res: express.Response) => {
    try {
      const { username, password } = req.body;
      try {
        await new Korisnik({ username, password, type: "Admin" }).save();
        return res.status(200).json({ message: "Success!" });
      } catch (e) {
        return res.status(400).json({ message: "failed" });
      }
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
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
        return res.status(200).json({ message: "Success!" });
      } else {
        return res.status(400).json({ message: "Wrong password" });
      }
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };

  edit_corp = async (req: express.Request, res: express.Response) => {
    try {
      const { _id, data } = req.body;
      const korisnik = await Korisnik.findOneAndUpdate(
        {
          _id,
          type: "Company",
        },
        data
      );
      if (korisnik) {
        return res.status(200).json({ message: "Success!" });
      } else {
        return res.status(400).json({ message: "Error" });
      }
    } catch (e) {
      console.log("[server] " + e);
      return res.status(400).json({ message: "failed" });
    }
  };
}
