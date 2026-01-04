// Importing multer for handling multipart/form-data (file uploads)
import multer from "multer";

// Importing fs to interact with the file system
import fs from "fs";

// Importing path to handle file and directory paths safely
import path from "path";

// Configuring disk storage engine for multer
const storage = multer.diskStorage({
  // Defining destination folder dynamically based on file field name
  destination: (req, file, cb) => {
    // If file is a thumbnail, store it in thumbnails folder; otherwise, store in videos folder
    let folder =
      file.fieldname === "thumbnail"
        ? "uploads/thumbnails"
        : "uploads/videos";

    // Create the folder if it does not already exist
    fs.mkdirSync(folder, { recursive: true });

    // Pass the folder path to multer
    cb(null, folder);
  },

  // Defining how uploaded files should be named
  filename: (req, file, cb) => {
    // Extracting file extension from original file name
    const ext = path.extname(file.originalname);

    // Extracting base name and replacing spaces with underscores
    const name = path
      .basename(file.originalname, ext)
      .replace(/\s+/g, "_");

    // Generating a unique filename using current timestamp
    cb(null, `${Date.now()}_${name}${ext}`);
  }
});

// Creating multer upload middleware with configuration
const upload = multer({
  storage, // Using the custom disk storage configuration

  // Limiting maximum file size to 1GB
  limits: { fileSize: 1024 * 1024 * 1024 },

  // Filtering files based on field name and MIME type
  fileFilter: (req, file, cb) => {
    // Allow only video files for "video" field
    if (file.fieldname === "video" && !file.mimetype.startsWith("video/")) {
      return cb(new Error("Only video files allowed!"), false);
    }

    // Allow only image files for "thumbnail" field
    if (file.fieldname === "thumbnail" && !file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files allowed!"), false);
    }

    // Accept the file if validation passes
    cb(null, true);
  }
});

// Exporting the configured multer middleware
export default upload;
