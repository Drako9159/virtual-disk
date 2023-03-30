import multer from "multer";
import path from "node:path";
import fs from "node:fs";

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
function validateFile(check, filename) {
  const pathStorage = path.join(process.cwd(), `./src/storage/${check}/${filename}`);
  try {
    if (fs.existsSync(pathStorage)) {
      return "file_exist";
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
    //const filename = `file-${Date.now()}.${ext}`;
    const copy = `${file.originalname.split(".")[0]}${Date.now()}.${ext}`;
    const { filePath } = req.body;
    const valideFile = validateFile(filePath, file.originalname)
    if(valideFile === "file_exist") cb(null, copy)
    cb(null, file.originalname);
  },
  onError: function (err, next) {
    console.log("error", err);
    next(err);
  },
});

const uploadMiddleware = multer({ storage });
export default uploadMiddleware;
