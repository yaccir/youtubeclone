import jwt from "jsonwebtoken";

export function verifytoken(req, res, next) {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Authorization token missing" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Token missing" });

    jwt.verify(token, "secretkey11", (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid token", error: err });

      req.user = decoded; // attach decoded token to request
      next();
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
