import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import AuthPage from "./pages/AuthPage";
import ResultsPage from "./pages/ResultsPage";
import Footer from "./components/Footer";
import ProfilePage from "./pages/ProfilePage";
import FeedbackPage from "./pages/FeedbackPage";

import InstitutionDashboard from "./components/InstitutionDashboard";
import EmployeeDashboard from "./components/EmployeeDashboard";
import CompanyDashboard from "./components/CompanyDashboard";

import RoleSelectionPage from "./pages/RoleSelectionPage";
import StudentForm from "./pages/register/StudentForm";
import InstitutionForm from "./pages/register/InstitutionForm";
import EmployeeForm from "./pages/register/EmployeeForm";
import CompanyForm from "./pages/register/CompanyForm";

import Dashboard from "./pages/Student/Dashboard";
import ResumeBuilder from "./pages/Student/ResumeBuilder";
import ResumeATS from "./pages/Student/ResumeATS";
import Jobs from "./pages/Student/Jobs";
import UserJobs from "./pages/Student/UserJobs";
import Coding from "./pages/Student/Coding";
import InterviewInterface from "./pages/Student/InterviewInterface";
import Aptitude from "./pages/Student/Aptitude";
import InterviewExperience from "./pages/Student/InterviewExperience";
import Settings from "./pages/Student/Settings";
import DashboardLayout from "./layouts/DashboardLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import useLenis from "./components/useLenis";
import ScrollToTop from "./components/ScrollToTop";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ✅ Wrapper to allow useLocation inside Router
const AppWrapper = () => {
  useLenis();
  const location = useLocation();

  // Footer visible only on home page
  const shouldHideFooter = location.pathname !== "/";

  return (
    <>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 flex flex-col justify-between">
        <div>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/register" element={<RoleSelectionPage />} />
            <Route path="/register/student" element={<StudentForm />} />
            <Route path="/register/institution" element={<InstitutionForm />} />
            <Route path="/register/employee" element={<EmployeeForm />} />
            <Route path="/register/company" element={<CompanyForm />} />
            <Route path="/feedback" element={<FeedbackPage />} />

            {/* Standalone Route */}
            <Route path="/interview" element={<InterviewInterface />} />

            {/* Dashboards */}
            <Route path="/dashboard/institution" element={<InstitutionDashboard />} />
            <Route path="/dashboard/employee" element={<EmployeeDashboard />} />
            <Route path="/dashboard/company" element={<CompanyDashboard />} />

            {/* Results */}
            <Route
              path="/results/:interviewId"
              element={
                <ProtectedRoute>
                  <ResultsPage />
                </ProtectedRoute>
              }
            />

            {/* Student Dashboard Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="resume-builder" element={<ResumeBuilder />} />
              <Route path="resume-ats" element={<ResumeATS />} />
              <Route path="jobs" element={<Jobs />} />
              <Route path="user-jobs" element={<UserJobs />} />
              <Route path="coding" element={<Coding />} />
              <Route path="interview-practice" element={<InterviewInterface />} />
              <Route path="aptitude" element={<Aptitude />} />
              <Route path="interview-experience" element={<InterviewExperience />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </div>

        {/* Toast Notifications */}
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />

        {/* Conditional Footer */}
        {!shouldHideFooter && <Footer />}
      </div>
    </>
  );
};

// ✅ Actual App that wraps AppWrapper inside Router
function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;
