import channelModel from "../Models/Channel.model.js";
import userModel from "../Models/User.Model.js";

export async function createChannel(req, res) {
  try {
    const { channelName, channelDescription } = req.body;
    const {id,email}=req.user;
    

    // basic validation
    if (!channelName) {
      return res.status(400).json({ message: "Channel name is required" });
    }

    // check existing channel
    const existingChannel = await channelModel.findOne({ channelName });
    if (existingChannel) {
      return res.status(409).json({ message: "Channel already exists" });
    }

    // channel image URL
    const channelprofile = req.file
      ? `${process.env.BASE_URL}/uploads/channelprofile/${req.file.filename}`
      : null;

    const newChannel = await channelModel.create({
      channelName,              
      channelDescription,
      channelprofile,
      userid:id,
      useremail:email
    });

    

    res.status(201).json({
      message: "Channel created successfully",
      channel: newChannel
    });

    
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}
