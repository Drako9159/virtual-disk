import axios from "../libs/axios";

export async function getDirectories() {
  return await axios.get("/storage");
}
export async function entryFolder(path) {
  return await axios.get(`/storage?folder=${path}`);
}
export async function createFolder(path) {
  const res = await axios.post("/storage?folderPath=" + path);
  res.headers["Content-Type"];
  return res;
}
export async function uploadFile(path, file) {
  const formData = new FormData();
  formData.append("filePath", path);
  formData.append("myFile", file);
  return await axios.post("/storage/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
}
