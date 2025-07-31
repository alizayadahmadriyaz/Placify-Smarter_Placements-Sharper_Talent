import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";       // base model
import Student from "../models/Student.js"; // discriminator
import Company from "../models/Company.js";
import Employee from "../models/Employee.js";
import Institution from "../models/Institution.js";

const generateToken = (id, role) =>
  jwt.sign({ userId: id, role }, process.env.JWT_SECRET, { expiresIn: "7d" });

// ---------------- REGISTER ----------------
export const registerStudent = async (req, res) => {
  try {
    const { fullName, university, major, email, password } = req.body;

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await Student.create({ fullName, university, major, email, password: hashedPassword});

    res.status(201).json({ message: "Student registered successfully" });
  } catch (error) {
    console.error("Student Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerInstitution = async (req, res) => {
  try {
    const { institutionName, website, contactPerson, email, password } = req.body;

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await Institution.create({ institutionName, website, contactPerson, email, password: hashedPassword});

    res.status(201).json({ message: "Institution registered successfully" });
  } catch (error) {
    console.error("Institution Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerEmployee = async (req, res) => {
  try {
    const { fullName, currentCompany, jobTitle, email, password } = req.body;

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await Employee.create({ fullName, currentCompany, jobTitle, email, password: hashedPassword});

    res.status(201).json({ message: "Employee registered successfully" });
  } catch (error) {
    console.error("Employee Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const registerCompany = async (req, res) => {
  try {
    const { companyName, industry, email, password, website } = req.body;

    if (await User.findOne({ email }))
      return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    await Company.create({
      companyName,
      industry,
      website,
      email,
      password: hashedPassword
    });

    res.status(201).json({ message: "Company registered successfully" });
  } catch (error) {
    console.error("Company Register Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};


// ---------------- LOGIN ----------------
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "Email and password are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id, user.role);

    res.json({
      token,
      user: {
        id: user._id,
        role: user.role,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ---------------- PROFILE ----------------
export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (error) {
    console.error("Get profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const allowedFields = ["name", "phone", "dob", "address", "gender", "education", "profileImage"];
    const updateData = {};

    for (let field of allowedFields) {
      if (req.body[field] !== undefined) updateData[field] = req.body[field];
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.userId,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select("-password");

    res.json(updatedUser);
  } catch (error) {
    console.error("Update profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
