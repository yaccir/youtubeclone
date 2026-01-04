// Importing multer to handle multipart/form-data for file uploads
import multer from "multer";

// Importing path to manage file paths and extensions
import path from "path";

// Importing fs to interact with the file system
import fs from "fs";

// Defining the directory where user profile pictures will be stored
const uploadDir = "uploads/profilepics";

// Checking if the upload directory exists
// If it does not exist, create it recursively
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configuring disk storage settings for multer
const storage = multer.diskStorage({
  // Setting destination directory for uploaded profile pictures
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  // Defining the naming convention for uploaded files
  filename: (req, file, cb) => {
    // Extracting the original file extension
    const ext = path.extname(file.originalname);

    // Generating a unique identifier using timestamp and random number
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);

    // Creating a unique filename while preserving the file extension
    cb(null, "profile-" + unique + ext);
  }
});

// File filter to allow only specific image MIME types
const fileFilter = (req, file, cb) => {
  // List of allowed image types
  const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

  // Check if uploaded file MIME type is allowed
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    // Reject file if MIME type is not supported
    cb(new Error("Only JPG, PNG, WEBP images allowed"), false);
  }
};

// Creating multer middleware for profile picture uploads
const uploadprofile = multer({
  storage,     // Custom disk storage configuration
  fileFilter,  // Image-only file filter
  limits: {
    fileSize: 2 * 1024 * 1024 // Maximum file size limit of 2MB
  }
});

// Exporting the configured upload middleware
export default uploadprofile;
