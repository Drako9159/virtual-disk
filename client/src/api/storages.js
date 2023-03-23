import axios from "../libs/axios";

export async function getDirectories() {
  return await axios.get("/storage");
}
