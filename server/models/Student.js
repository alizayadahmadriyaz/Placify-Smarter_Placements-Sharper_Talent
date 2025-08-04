import mongoose from "mongoose";
import User from "./User.js";

const studentSchema = new mongoose.Schema({
  university: { type: String, required: true },
  major: { type: String, required: true }
});

export default User.discriminator("Student", studentSchema);
