import {
  refreshMoviesInfo,
  sendPoster,
  sendInfo,
  sendVideo,
} from "../libs/reader-movies.js";
import handleError from "../utils/handleError.js";

export async function syncMoviesInfo(req, res) {
  const { sync } = req.query;
  if (sync === "true") {
    await refreshMoviesInfo();
    res.send({ message: "ALL_SYNC" });
  } else {
    res.send({ message: "NO_SYNC" });
  }
}

export async function getInfo(req, res) {
  try {
    const data = await sendInfo();
    res.send({ data: data });
  } catch (error) {
    handleError(res, "ERROR_QUERY", 500);
  }
}

export async function getVideo(req, res) {
  const { video } = req.query;
  const range = req.headers.range;
  //const range = "bytes=0-1000000";
  if(!video){
    handleError(res, "VIDEO_NOT_INCLUDE", 500);
  } else if(video && range){
    await sendVideo(res, video, range);
  } else {
    await sendVideo(res, video);
  }

}




export async function getPoster(req, res) {
  const { poster } = req.query;
  const data = await sendPoster(poster);
  if (!poster) {
    res.send({ data: data });
  } else {
    try {
      const data = await sendPoster(poster);
      res.download(data, (err) => {
        if (err) {
          handleError(res, "POSTER_NOT_INCLUDE", 500);
        }
      });
    } catch (error) {
      handleError(res, "ERROR_QUERY", 500);
    }
  }
}
