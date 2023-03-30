import fs from "node:fs";
import path from "node:path";
import handleFormatBytes from "../utils/handleFormatBytes.js";
import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";
// get path for reader
const PATH_ICONS = path.join(process.cwd(), `./src/assets/iconsFormat/`);
const PATH_FOLDERS = path.join(process.cwd(), `./src/storage/`);

function getPath(seed, dir = "") {
  const library = {
    pathSingleDirectories: path.join(process.cwd(), `./src/storage/${dir}/`),
  };
  return library[seed];
}

async function readIcons() {
  return fs.readdirSync(PATH_ICONS);
}
async function readFolder(dir = "") {
  return fs.readdirSync(PATH_FOLDERS + dir);
}

export async function sendIcons(icon = "") {
  if (icon === "") {
    return await readIcons();
  } else {
    return readIcons() + icon;
  }
}

export async function recoverData(dir = "") {
  const folders = await readFolder(dir);
  const icons = await readIcons();
  let data = [];
  folders.forEach((e) => {
    const stats = fs.statSync(PATH_FOLDERS + dir + "/" + e);

    const pathName = path.extname(PATH_FOLDERS + dir + "/" + e).toLowerCase();
    const haveIcon = pathName.split(".")[1] + ".png";

    let push = {};
    if (stats.isDirectory()) {
      push = {
        id: uuidv4(),
        name: e,
        isDirectory: stats.isDirectory(),
        size: handleFormatBytes(stats.size),
        type: "folder",
        icon_path: "folder-fill.svg",
        path: dir + "/" + e + "/",
      };
    } else {
      push = {
        id: uuidv4(),
        name: e,
        isDirectory: stats.isDirectory(),
        size: handleFormatBytes(stats.size),
        type: pathName,
        icon_path: icons.includes(haveIcon) ? haveIcon : "file.svg",
        path: dir + "/" + e + "/",
      };
    }
    data.push(push);
  });
  return data;
}
export async function checkExist(file) {
  return fs.existsSync(PATH_FOLDERS + file);
}

export function sendDownload(file) {
  const mimeType = mime.lookup(PATH_FOLDERS + file);
  const filename = path.basename(PATH_FOLDERS + file);
  const stats = fs.statSync(PATH_FOLDERS + file);
  const itemSize = stats.size;
  const head = {
    "Content-Type": mimeType,
    "Content-Length": itemSize,
    "Content-Disposition": "attachment; filename=" + filename,
    "Content-Disposition": "inline; filename=" + filename,
  };
  const filestream = fs.createReadStream(PATH_FOLDERS + file);
  return { head, filestream };
}

export async function mkdirFolder(folder) {
  fs.mkdirSync(PATH_FOLDERS + folder);
}
