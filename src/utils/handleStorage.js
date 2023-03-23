import multer from "multer";
import path from "node:path";
import fs from "node:fs";

// recive tpye file for create folder
function getPath(type) {
  const library = {
    "image/jpeg": "image",
    "image/png": "image",
    "video/x-msvideo": "video",
    "application/octet-stream": "video",
    "application/pdf": "pdf",
    "application/zip": "compressed",
    "application/vnd.rar": "compressed",
    "application/vnd.android.package-archive": "android",
    "audio/mpeg": "audio",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      "docs",
  };

  if (!library[type]) throw new Error("no such mimetype");
  const pathStorage = path.join(
    process.cwd(),
    `./src/storage/${library[type]}/`
  );
  try {
    if (!fs.existsSync(pathStorage)) {
      fs.mkdirSync(pathStorage);
    }
    return path.join(process.cwd(), `./src/storage/${library[type]}/`);
  } catch (e) {
    throw new Error("not such folder");
  }
}

function valideFolder(check) {
  const pathStorage = path.join(process.cwd(), `./src/storage/${check}/`);
  try {
    if (!fs.existsSync(pathStorage)) {
      return "fail";
    } else {
      return path.join(process.cwd(), `./src/storage/${check}/`);
    }
  } catch (e) {
    throw new Error("not such folder");
  }
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const { filePath } = req.body;
    const pathStorage = valideFolder(filePath);
    cb(null, pathStorage);
  },
  filename: function (req, file, cb) {
    const ext = file.originalname.split(".").pop();
    const filename = `file-${Date.now()}.${ext}`;
    cb(null, file.originalname);
  },
  onError: function(err, next){
    console.log("error", err)
    next(err)
  }
});

const uploadMiddleware = multer({ storage });
export default uploadMiddleware;
