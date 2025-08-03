import mongoose from "mongoose";
import User from "./User.js";

const institutionSchema = new mongoose.Schema({
  institutionName: { type: String, required: true },
  website: { type: String, required: true },
  contactPerson: { type: String, required: true },
});

export default User.discriminator("Institution", institutionSchema);
