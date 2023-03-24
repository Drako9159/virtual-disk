import fs from "node:fs";
import path from "node:path";
import handleFormatBytes from "../utils/handleFormatBytes.js";
import mime from "mime-types";
import { v4 as uuidv4 } from "uuid";
// get path for reader

function getPath(seed, dir = "") {
  const library = {
    pathSingleDirectories: path.join(process.cwd(), `./src/storage/${dir}/`),
    pathIcons: path.join(process.cwd(), `./src/assets/iconsFormat/`),
  };
  return library[seed].replace(/\\/gi, "/");
}

// apply reader
async function readDirectories(seed, dir) {
  const library = {
    readIcons: fs.readdirSync(getPath("pathIcons")),
    readFolders: fs.readdirSync(getPath("pathSingleDirectories", dir)),
  };
  return await library[seed];
}

export async function sendIcons(icon = "") {
  if (icon === "") {
    return await readDirectories("readIcons");
  } else {
    return getPath("pathIcons") + icon;
  }
}

export async function recoverData(dir = "") {
  const folders = await readDirectories("readFolders", dir);
  const icons = await readDirectories("readIcons");

  let data = [];
  folders.forEach((e) => {
    //const suPath = getPath("pathSingleDirectories", dir + e)
    const stats = fs.statSync(getPath("pathSingleDirectories", dir + e));
    const pathName = path
      .extname(getPath("pathSingleDirectories", dir + e))
      .toLowerCase();
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
        path: dir + e + "/",
      };
    } else {
      push = {
        id: uuidv4(),
        name: e,
        isDirectory: stats.isDirectory(),
        size: handleFormatBytes(stats.size),
        type: pathName,
        icon_path: icons.includes(haveIcon) ? haveIcon : "file.svg",
        path: dir + e + "/",
      };
    }
    data.push(push);
  });
  return data;
}
export async function checkExist(file) {
  return fs.existsSync(getPath("pathSingleDirectories", file));
}

export function sendDownload(file) {
  const mimeType = mime.lookup(getPath("pathSingleDirectories", file));
  const filename = path.basename(getPath("pathSingleDirectories", file));
  const head = {
    "Content-Type": mimeType,
    "Content-Disposition": "attachment; filename=" + filename,
    "Content-Disposition": "inline; filename=" + filename,
  };
  const filestream = fs.createReadStream(
    getPath("pathSingleDirectories", file)
  );
  return { head, filestream };
}

export async function mkdirFolder(folder) {
  fs.mkdirSync(getPath("pathSingleDirectories", folder));
}
