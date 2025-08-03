import mongoose from "mongoose";
import User from "./User.js";

const employeeSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  currentCompany: { type: String, required: true },
  jobTitle: { type: String, required: true },
});

export default User.discriminator("Employee", employeeSchema);
