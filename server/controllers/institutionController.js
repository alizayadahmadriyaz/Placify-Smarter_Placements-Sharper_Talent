import Student from '../models/Student.js';
import Company from '../models/Company.js';

export const getInstitutionDashboard = async (req, res) => {
  try {
    const institutionId = req.user.id; // From token

    // Get all students for this institution
    const students = await Student.find({ institution: institutionId });

    const totalStudents = students.length;
    const placedStudents = students.filter(s => s.placementStatus === 'placed').length;
    const placementRate = totalStudents ? ((placedStudents / totalStudents) * 100).toFixed(2) : 0;

    const performanceData = students.map((s) => ({
      name: s.name,
      score: s.performanceScore || 0,
    }));

    // Optional: Fetch companies who hired students from this institution
    const companies = await Company.find({ "hiredStudents.institution": institutionId });

    const companyData = companies.map((c) => ({
      name: c.name,
      role: c.role,
      location: c.location,
    }));

    res.json({
      totalStudents,
      placedStudents,
      placementRate,
      performanceData,
      companyData,
    });
  } catch (err) {
    console.error("Dashboard error:", err.message);
    res.status(500).json({ message: "Server error while fetching dashboard" });
  }
};
