import { Router } from "express";
import uploadMiddleware from "../utils/handleStorage.js";
import {
  getDirectories,
  getIcons,
  getDownload,
  createFolder,
} from "../controllers/storage.controller.js";
import { syncMoviesInfo, getPoster, getInfo, getVideo } from "../controllers/movies.controller.js";
const router = Router();

import path from "node:path";
/*
router.get("/site", (req, res) => {
  res.sendFile(path.join(process.cwd() + "/client/dist", "index.html"));
  //res.send({ message: "listo" });
});
*/


/*
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
   });*/

router.get("/storage", getDirectories);

router.get("/storage/icons", getIcons);

router.get("/storage/download", getDownload);

router.post("/storage", createFolder);

router.post(
  "/storage/upload",
  uploadMiddleware.single("myFile"),
  (req, res) => {
    res.send({ message: "ok" });
  }
);

// Movies
router.get("/storage/movies", syncMoviesInfo);

router.get("/storage/movies/info", getInfo);

router.get("/storage/movies/poster", getPoster);

router.get("/storage/movies/video", getVideo)

export default router;
