import fs from "node:fs";
import path from "node:path";
import { v4 as uuidv4 } from "uuid";
import handleFormatBytes from "../utils/handleFormatBytes.js";
const DB_MOVIES = path.join(process.cwd(), "./src/databases/movies.json");
const POSTER_IMG = path.join(process.cwd(), "./src/databases/posters/");
const MOVIES_DIRECTORY = path.join(process.cwd(), "./src/storage");
const search_movie =
  "https://api.themoviedb.org/3/search/multi?api_key=819b01ed346caef6fa382aec7fa78ab5&language=es&page=1&include_adult=true&query=";
//const json_files = fs.readFileSync(DB_MOVIES, "utf-8");

async function apiSearchMovie(name, filename, format, size, episode) {
  const res = await fetch(search_movie + name);
  const data = await res.json();
  let recuv = null
  const checkMediaType = data.results[0].media_type
  if ( checkMediaType === "movie"){
    const {
      original_title,
      title,
      overview,
      release_date,
      poster_path,
      id,
      media_type,
    } = data.results[0];
    recuv = {
      id: uuidv4(),
      original_id: id,
      original_title,
      title,
      media_type,
      overview,
      release_date,
      poster_path,
      filename: filename,
      type: format,
      size,
      poster_url: "https://image.tmdb.org/t/p/w500",
    };
    return recuv;

  } else {
    const {
      original_name,
      name,
      overview,
      first_air_date,
      poster_path,
      id,
      media_type,
    } = data.results[0];
    const recuv = {
      id: uuidv4(),
      original_id: id,
      original_name,
      name,
      media_type,
      overview,
      first_air_date,
      poster_path,
      filename: filename,
      type: format,
      size,
      episode: episode,
      poster_url: "https://image.tmdb.org/t/p/w500",
    };
    return recuv;
  }
  
}

async function comprobeMoviesFolder() {
  const checkInclude = fs.readdirSync(MOVIES_DIRECTORY);
  if (checkInclude.includes("movies")) {
    return fs.readdirSync(MOVIES_DIRECTORY + "/movies");
  }
  return false;
}

async function dbWriter(db) {
  fs.writeFileSync(DB_MOVIES, JSON.stringify(db, null, 2), "utf-8");
}

async function bufferImages(poster_path) {
  const responseImage = await fetch(
    "https://image.tmdb.org/t/p/w500"+ poster_path
  );
  const arrayBuffer = await responseImage.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  fs.writeFileSync(POSTER_IMG + poster_path.split("/")[1], buffer);
}
async function resetImages(){
  const removeFiles = fs.readdirSync(POSTER_IMG)
  console.log(removeFiles)
  removeFiles.forEach(e => {
    fs.rmSync(POSTER_IMG + e)
  })
  
}

export async function refreshMoviesInfo() {
  await resetImages()
  const directories = await comprobeMoviesFolder();
  let movies = [];

  if (directories) {
    directories.forEach(async (e) => {
      const check = path.extname(MOVIES_DIRECTORY + "/movies/" + e);
      const stats = fs.statSync(MOVIES_DIRECTORY + "/movies/" + e);
      const getSize = handleFormatBytes(stats.size);
      let movieName = e.replace(check, "");
      movieName = movieName.replace(/_/g, " ");
      let episode = movieName.split(/\[(\d+x\d+)\]/gi)
    
      if(!episode[1]) episode[1] = "not_provider"
      movieName = movieName.replace(/\[.*?\]/gi, "")
      console.log(movieName)
      const data = await apiSearchMovie(movieName, e, check, getSize, episode[1]);
      movies.push(data);
      await dbWriter(movies);
      
      await bufferImages(data.poster_path)
    });
  }
}
