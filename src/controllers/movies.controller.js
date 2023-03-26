import { refreshMoviesInfo } from "../libs/reader-movies.js";

export async function syncMoviesInfo(req, res) {
  const { sync } = req.query;
  // const names = ["harry_photer", "jaws", "jhon_wick"];
  //John Wick
  //console.log(sync);
  await refreshMoviesInfo();
  res.send({ message: "ok" });
}
