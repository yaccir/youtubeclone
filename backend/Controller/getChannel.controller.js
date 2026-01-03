import channelModel from "../Models/Channel.model.js";
import jwt from "jsonwebtoken";

export async function getchannel(req, res) {
  try {
    // 1. Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ message: "Token missing" });
    }

    const token = authHeader.split(" ")[1]; // Bearer <token>

    // 2. Verify token
    const decoded = jwt.verify(token, "secretkey11");

    // 3. Query channels by user email
    const totalchannels = await channelModel.find({
      useremail: decoded.email
    });
    console.log(decoded.email)
    // 4. Send response
    res.status(200).json(totalchannels);

  } catch (err) {
    res.status(401).json({ message: "Invalid or expired token", error: err.message });
  }
}
