import multer from "multer";
import fs from "fs";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "thumbnail") {
      fs.mkdirSync("uploads/thumbnails", { recursive: true });
      cb(null, "uploads/thumbnails");
    } else {
      fs.mkdirSync("uploads/videos", { recursive: true });
      cb(null, "uploads/videos");
    }
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "_" + file.originalname);
  }
});

const upload = multer({ storage });
export default upload;
