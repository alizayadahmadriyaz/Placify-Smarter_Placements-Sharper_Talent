// models/Company.js

import mongoose from "mongoose";
import User from "./User.js";

// Use only 'name': never add 'companyName', as the base User already has 'name'
const companySchema = new mongoose.Schema({
  industry: { type: String, required: true },
  website: { type: String },
  description: { type: String },
  foundedYear: { type: Number },
  employeeCount: { type: Number }
});

export default User.discriminator("Company", companySchema);
