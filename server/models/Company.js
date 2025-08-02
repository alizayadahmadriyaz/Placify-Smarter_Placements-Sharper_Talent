import mongoose from "mongoose";
import User from "./User.js";

const companySchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  industry: { type: String, required: true },
  website: { type: String, required: true },
});

export default User.discriminator("company", companySchema);
