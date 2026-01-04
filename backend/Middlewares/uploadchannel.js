// Importing multer to handle file uploads
import multer from "multer";

// Importing path to work with file paths and extensions
import path from "path";

// Importing fs to interact with the file system
import fs from "fs";

// Defining the directory where channel profile images will be stored
const uploadDir = "uploads/channelprofile";

// Checking if the upload directory exists
// If it does not exist, create it recursively
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuring disk storage settings for multer
const storage = multer.diskStorage({
  // Setting the destination directory for uploaded files
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  // Defining how uploaded files should be named
  filename: (req, file, cb) => {
    // Extracting the original file extension
    const ext = path.extname(file.originalname);

    // Generating a unique identifier using timestamp and random number
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // Creating a unique filename while preserving the extension
    cb(null, "profile-" + unique + ext);
  }
});

// File filter to allow only specific image MIME types
const fileFilter = (req, file, cb) => {
  // List of allowed image MIME types
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  // Check if uploaded file type is allowed
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Reject file if MIME type is not allowed
    cb(new Error("Only JPG, PNG, WEBP images allowed"), false);
  }
};

// Creating multer middleware for channel profile uploads
const uploadChannel = multer({
  storage,     // Using custom storage configuration
  fileFilter,  // Applying image-only file filter
  limits: {
    fileSize: 2 * 1024 * 1024 // Limiting file size to 2MB
  }
});

// Exporting the configured upload middleware
export default uploadChannel;
