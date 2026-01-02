import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure directory exists
const uploadDir = "uploads/channelprofile";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // KEEP extension
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "profile-" + unique + ext);
  }
});

// Allow only images
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, PNG, WEBP images allowed"), false);
  }
};

const uploadChannel = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 } // 2MB
});

export default uploadChannel;
