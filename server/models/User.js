import mongoose from "mongoose";

const baseUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  // role: {
  //   type: String,
  //   enum: ["student", "company", "institution", "employee"],
  //   required: true
  // },
  name: String,
  phone: String,
  dob: Date,
  address: String,
  gender: String,
  education: String,
  profileImage: String
}, {
  timestamps: true,
  // discriminatorKey: "role"
});

const User = mongoose.model("User", baseUserSchema);
export default User;
