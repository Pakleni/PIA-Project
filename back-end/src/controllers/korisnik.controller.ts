import express from "express";
import mongoose from "mongoose";
import Korisnik from "../models/korisnik";
import Zahtev from "../models/zahtev";

export class KorisnikController {
  login = async (req: express.Request, res: express.Response) => {
    try {
      const { username, password } = req.body;
      const korisnik = await Korisnik.findOne({ username, password });

      if (korisnik) return res.status(200).json(korisnik);
      else return res.sendStatus(401);
    } catch (e) {
      console.log("[server] " + e);
    }
  };
  user_signup = async (req: express.Request, res: express.Response) => {
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
          //TODO {Add correct errors to endpoints}
          return res.status(400).json({ message: "failed" });
        }
      else {
        return res.status(403).json({ message: "not logged in" });
      }
    } catch (e) {
      console.log("[server] " + e);
    }
  };
  corp_signup = async (req: express.Request, res: express.Response) => {
    try {
      const { user, data } = req.body;

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
            //TODO {Add correct errors to endpoints}
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
              await new Zahtev(data).save();
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
          //TODO {Add correct errors to endpoints}
          return res.status(400).json({ message: e.toString() });
        } finally {
          await session.endSession();
        }
      }
    } catch (e) {
      console.log("[server] " + e);
    }
  };
  admin_signup = async (req: express.Request, res: express.Response) => {
    try {
      const { username, password } = req.body;
      try {
        await new Korisnik({ username, password, type: "Admin" }).save();
        return res.status(200).json({ message: "Success!" });
      } catch (e) {
        //TODO {Add correct errors to endpoints}
        return res.status(400).json({ message: "failed" });
      }
    } catch (e) {
      console.log("[server] " + e);
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
    }
  };
}
