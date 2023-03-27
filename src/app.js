import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import {} from "dotenv/config";

const app = express();

app.set("port", process.env.BACKEND_PORT);
app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

app.use(express.static(path.join(process.cwd(), "./public")));
app.use(express.static(path.join(process.cwd() + "/client/dist")))

//app.use(express.static(path.join(process.cwd() + "/client/dist/assets")))
app.use("/movies", (req, res) => { res.sendFile(path.join(process.cwd() + "/client/dist", "index.html")) })
//app.use("/api", createProxyMiddleware({ target: "http://localhost:5000", changeOrigin: true }));

//app.get("/site", (req, res) => { res.sendFile(path.join(process.cwd() + "/client/dist", "index.html")) })
// routes
/*
import files from "./routes/files.routes.js";
app.use("/api", files);

import storage from "./routes/storage.routes.js";
app.use("/api", storage);
*/
import storageV2 from "./routes/storage.routes.js";
app.use("/api", storageV2);
/*
app.use((req, res, next) => {
  res
    .status(404)
    .header("Content-Type", "application/json; charset=utf-8")
    .send("404 Not Found");
});
*/
export default app;
