import React, { useState, useEffect } from "react";
import axios from "axios";
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const API_BASE = "http://localhost:5000";

const ProfilePage = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState({
    fullName: "",
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    education: "",
    gender: "",
    role: "",
    university: "",
    major: "",
    profileImage: "",
  });

  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/auth/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.dob) {
          res.data.dob = new Date(res.data.dob).toISOString().split("T")[0];
        }
        setProfile(res.data);
        if (res.data.profileImage) {
          setImagePreview(`${API_BASE}${res.data.profileImage}`);
        }
      } catch (err) {
        console.error("Fetch profile error:", err);
        toast.error("Failed to load profile data");
      } finally {
        setTimeout(() => setIsLoaded(true), 150);
      }
    };
    fetchProfile();
  }, [navigate, token]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setImageFile(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setProfile({ ...profile, profileImage: "" });
  };

  const handleSave = async () => {
    try {
      const formData = new FormData();
      // Only editable fields
      ["name", "phone", "dob", "address", "gender", "education"].forEach((key) =>
        formData.append(key, profile[key] || "")
      );
      if (imageFile) {
        formData.append("profileImage", imageFile);
      }
      const response = await axios.put(`${API_BASE}/api/auth/profile`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.dob) {
        response.data.dob = new Date(response.data.dob).toISOString().split("T")[0];
      }
      setProfile(response.data);
      if (response.data.profileImage) {
        setImagePreview(`${API_BASE}${response.data.profileImage}`);
      }
      toast.success("Profile updated successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Error updating profile:", err);
      toast.error(err.response?.data?.message || "Update failed");
    }
  };

  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField(null);

  const fields = [
    { key: "fullName", editable: false },
    { key: "name", editable: true },
    { key: "email", editable: false },
    { key: "phone", editable: true },
    { key: "dob", editable: true },
    { key: "address", editable: true },
    { key: "education", editable: true },
    { key: "gender", editable: true },
    { key: "role", editable: false },
    { key: "university", editable: true },
    { key: "major", editable: true },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 relative overflow-hidden">
      <div className="relative z-10 flex items-center justify-center min-h-screen p-4 py-8">
        <div
          className={`w-full max-w-2xl bg-white bg-opacity-95 backdrop-blur-lg rounded-3xl shadow-2xl p-8 transform transition-all duration-1000 ease-out ${
            isLoaded
              ? "translate-y-0 opacity-100 scale-100"
              : "translate-y-10 opacity-0 scale-95"
          }`}
        >
          <div className="text-center mb-6">
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              User Profile
            </h2>
            <p className="text-gray-600 text-sm">
              Update your profile information
            </p>
          </div>

          {/* Profile Image */}
          <div className="flex flex-col items-center mb-6 relative group">
            <label
              htmlFor="profile-upload"
              className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden shadow-lg hover:scale-105 transition"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="user"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <User className="w-10 h-10 text-gray-500" />
              )}
              <input
                type="file"
                accept="image/*"
                id="profile-upload"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
            {imagePreview && (
              <button
                onClick={handleRemoveImage}
                className="mt-2 text-red-500 text-sm hover:underline"
              >
                Remove Picture
              </button>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fields.map(({ key, editable }, index) => (
              <div
                key={key}
                className="transition-transform"
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <label className="block text-sm font-medium text-gray-700 capitalize mb-2">
                  {key === "dob" ? "Date of Birth" : key}
                </label>
                <input
                  type={
                    key === "dob"
                      ? "date"
                      : key === "email"
                      ? "email"
                      : key === "phone"
                      ? "tel"
                      : "text"
                  }
                  name={key}
                  value={profile[key] || ""}
                  onChange={editable ? handleChange : undefined}
                  onFocus={() => editable && handleFocus(key)}
                  onBlur={handleBlur}
                  disabled={!editable}
                  className={`w-full px-4 py-3 rounded-xl border-2 transition-all focus:outline-none ${
                    focusedField === key
                      ? "border-purple-500 shadow-lg ring-4 ring-purple-500 ring-opacity-20 scale-105"
                      : "border-gray-200 hover:border-gray-300"
                  } ${!editable ? "bg-gray-100 cursor-not-allowed" : ""}`}
                  placeholder={`Enter your ${key}`}
                />
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <button
              id="save-button"
              onClick={handleSave}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 transition"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
