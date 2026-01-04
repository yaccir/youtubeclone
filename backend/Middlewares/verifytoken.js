// Importing jsonwebtoken to verify JWT authentication tokens
import jwt from "jsonwebtoken";

// Middleware function to verify general authentication token
export function verifytoken(req, res, next) {
  try {
    // Reading the Authorization header from the request
    const authHeader = req.headers.authorization;

    // If Authorization header is missing, deny access
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    // Extracting the token from the "Bearer <token>" format
    const token = authHeader.split(" ")[1];

    // If token is not present after splitting, deny access
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Verifying the JWT token asynchronously
    jwt.verify(token, "secretkey11", (err, decoded) => {
      // If token verification fails, return forbidden response
      if (err) {
        return res.status(403).json({
          message: "Invalid token",
          error: err
        });
      }

      // Attaching decoded token payload to the request object
      req.user = decoded;

      // Passing control to the next middleware or route handler
      next();
    });

  } catch (err) {
    // Handling unexpected server errors
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
}
