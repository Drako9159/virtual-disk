import { Router } from "express";
import uploadMiddleware from "../utils/handleStorage.js";
import {
  getDirectories,
  getIcons,
  getDownload,
  createFolder,
} from "../controllers/storage.controller.js";
const router = Router();
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

export default router;
