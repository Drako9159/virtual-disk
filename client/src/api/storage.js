import axios from "../libs/axios";

export async function getDirectories() {
  return await axios.get("/storage");
}
export async function entryFolder(path) {
  return await axios.get(`/storage?folder=${path}`);
}
