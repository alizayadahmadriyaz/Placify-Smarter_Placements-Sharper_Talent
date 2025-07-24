// src/pages/ProfilePage.jsx
import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";

const ProfilePage = () => {
  const [profile, setProfile] = useState({
    name: "Jane Doe",
    email: "janedoe@example.com",
    phone: "+91 9876543210",
    dob: "1995-07-15",
    address: "123, MG Road, Hyderabad",
    education: "B.Tech in Computer Science",
    gender: "Female",
  });

  const [image, setImage] = useState(null);

  // Load profile and image from localStorage on mount
  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }

    const storedImage = localStorage.getItem("profileImage");
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);

  // Handle profile input change
  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      localStorage.setItem("profileImage", imageUrl);
    }
  };

  // Save profile to localStorage
  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    alert("✅ Profile updated successfully!");
  };

  return (
    <>
      <Navbar />
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          User Profile
        </h2>

        {/* Profile image */}
        <div className="flex flex-col items-center mb-6">
          <label
            htmlFor="profile-upload"
            className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium text-sm cursor-pointer relative overflow-hidden shadow"
          >
            {image ? (
              <img
                src={image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-center">Profile</span>
            )}
            <input
              type="file"
              accept="image/*"
              id="profile-upload"
              onChange={handleImageChange}
              className="hidden"
            />
          </label>
        </div>

        {/* Profile form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(profile).map(([key, value]) => (
            <div key={key}>
              <label className="block text-sm font-medium text-gray-700 capitalize">
                {key}
              </label>
              <input
                type={key === "dob" ? "date" : "text"}
                name={key}
                value={value}
                onChange={handleChange}
                className="mt-1 w-full rounded-lg border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          ))}
        </div>

        {/* Save button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
