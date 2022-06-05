import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import korisnikRouter from "./routers/korisnik.routes";
import zahtevRouter from "./routers/zahtev.routes";
import artikalRouter from "./routers/artikal.routes";

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/piameanDB");
const connection = mongoose.connection;

// CONNECTION EVENTS
connection.once("open", () => {
  console.log("[server] db connection ok!");
});
connection.on("error", function (err) {
  console.log("[server] Mongoose default connection error: " + err);
});
connection.on("disconnected", function () {
  console.log("[server] Mongoose default connection disconnected");
});
process.on("SIGINT", function () {
  connection.close(function () {
    console.log(
      "[server] Mongoose default connection disconnected through app termination"
    );
    process.exit(0);
  });
});

const router = express.Router();
router.use("/korisnik", korisnikRouter);
router.use("/zahtev", zahtevRouter);
router.use("/artikal", artikalRouter);

app.use("/", router);

app.listen(4000, () =>
  console.log(`[server] Express server running on port 4000`)
);
