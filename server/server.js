import express from "express";
import cors from "cors";
import feedbackRoutes from "./routes/feedback.js";
import {PORT} from "./config/env.js" // ✅ Load PORT from centralized env file
import connectToDatabase from "./config/db.js";

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);
app.use(express.json());

// ====== API Routes ======
app.use("/api/feedback", feedbackRoutes);

app.get("/", (req, res) => {
  res.json({ 
    message: "Placify Feedback Server is running! 📧",
    status: "active",
    endpoints: {
      feedback: "/api/feedback",
      test: "/api/feedback/test"
    }
  });
});

app.get("/test", (req, res) => {
  res.json({ message: "Server is working!", timestamp: new Date().toISOString() });
});

// ====== Start Server ======
app.listen(PORT || 5000, async () => {
  console.log(`✅ Feedback server running on port ${PORT}`);
  // Optional: connect to MongoDB (requires valid DB_URI)
  await connectToDatabase(); // 🔄 Comment this out if not using MongoDB
  console.log(`📧 Ready to send emails!`);
});
