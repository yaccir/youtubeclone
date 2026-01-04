// Importing jsonwebtoken to verify JWT tokens
import jwt from "jsonwebtoken";

// Middleware function to verify channel-related JWT token
export function verifychanneltoken(req, res, next) {
  try {
    // Reading Authorization header from the request
    const authHeader = req.headers.authorization;

    // If Authorization header is missing, block the request
    if (!authHeader) {
      return res.status(401).json({ message: "Authorization header missing" });
    }

    // Extracting token from "Bearer <token>" format
    const token = authHeader.split(" ")[1];

    // If token is not present after splitting, block the request
    if (!token) {
      return res.status(401).json({ message: "Token missing" });
    }

    // Verifying the JWT token using the secret key
    // If token is invalid or expired, an error will be thrown
    const decoded = jwt.verify(token, "secretkey11");
    console.log(decoded)

    // Attaching decoded token data (user info) to request object
    req.user = decoded;

    // Logging decoded token payload for debugging
    console.log(decoded);

    // Passing control to the next middleware or controller
    next();
  } catch (error) {
    // Handling invalid or expired token errors
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
}
