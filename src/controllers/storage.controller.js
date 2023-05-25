import handleError from "../utils/handleError.js";
import {
  recoverData,
  checkExist,
  sendIcons,
  sendDownload,
  mkdirFolder,
} from "../libs/reader.js";

export async function getDirectories(req, res) {
  const { folder } = req.query;
  try {
    const data = await recoverData(folder);
    res.send({ data: data });
  } catch (error) {
    handleError(res, "ERROR_QUERY", 500);
  }
}

export async function createFolder(req, res) {
  const { folderPath } = req.query;
  if (await checkExist(folderPath)) {
    handleError(res, "FOLDER_EXIST", 500);
  } else {
    try {
      await mkdirFolder(folderPath);
      res.send({ message: "FOLDER_CREATED" });
    } catch (error) {
      handleError(res, "ERROR_CREATE_FOLDER", 500);
    }
  }
}

export async function getIcons(req, res) {
  const { format } = req.query;
  if (!format) {
    res.send({ data: await sendIcons() });
  } else {
    try {
      const data = await sendIcons(format);
      res.download(data, (err) => {
        if (err) {
          handleError(res, "ICON_NOT_INCLUDE", 500);
        }
      });
    } catch (error) {
      handleError(res, "ERROR_QUERY", 500);
    }
  }
}


export async function getDownload(req, res) {
  const { file } = req.query;
  if (await checkExist(file)) {
    try {
      const { head, filestream } = sendDownload(file);
      res.writeHead(200, head);
      filestream.pipe(res);
    } catch (error) {
      handleError(res, "ERROR_QUERY", 500);
    }
  } else {
    handleError(res, "FILE_NOT_EXIST", 500);
  }
}

