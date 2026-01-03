import multer from "multer";
import fs from "fs";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = file.fieldname === "thumbnail" ? "uploads/thumbnails" : "uploads/videos";
    fs.mkdirSync(folder, { recursive: true });
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}_${name}${ext}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 1024 }, // 1GB max
  fileFilter: (req, file, cb) => {
    if (file.fieldname === "video" && !file.mimetype.startsWith("video/"))
      return cb(new Error("Only video files allowed!"), false);
    if (file.fieldname === "thumbnail" && !file.mimetype.startsWith("image/"))
      return cb(new Error("Only image files allowed!"), false);
    cb(null, true);
  }
});

export default upload;
