// src/pages/register/InstitutionForm.jsx
import { School } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import FormInput from '../../components/FormInput';
import RegistrationHeader from '../../components/RegistrationHeader';
import Header from '../../components/Header';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function InstitutionForm() {
  const navigate = useNavigate();
  const { addUser } = useUser();
  const [formData, setFormData] = useState({
    institutionName: '',
    website: '',
    contactPerson: '',
    email: '',
    password: '',
    role: 'institution'
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic validation
    if (!formData.institutionName || !formData.website || !formData.contactPerson || !formData.email || !formData.password) {
      setError('All fields are required');
      setLoading(false);
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    // Website validation
    try {
      new URL(formData.website);
    } catch (error) {
      setError('Please enter a valid website URL');
      setLoading(false);
      return;
    }

    // Password validation (at least 6 characters)
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      setLoading(false);
      return;
    }

    try {
      // Save user to local storage
      // try {
      //   addUser(formData);
      //   console.log('Institution Registration Data saved to local storage:', formData);
      // } catch (localStorageError) {
      //   setError(localStorageError.message);
      //   setLoading(false);
      //   return;
      // }

      // // Simulate API delay
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      // // Success toast
      // toast.success('Institution registration successful! Please login with your email and password.');

      // // Redirect after short delay
      // setTimeout(() => {
      //   navigate('/auth');
      // }, 2000);

      // Uncomment this when backend is ready

      const response = await fetch('http://localhost:5000/api/auth/register/institution', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Registration failed');
      }

      toast.success('Institution registration successful! Please login.');
      setTimeout(() => navigate('/auth'), 3000);
    } catch (error) {
      console.error('Registration error:', error);
      if (error.message === 'Failed to fetch') {
        setError('Server connection error. The backend server might not be running. Please try again later.');
      } else {
        setError(error.message || 'Registration failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    // 1. ADDED dark mode background to the main container
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      <Header />
      <ToastContainer position="top-center" autoClose={3000} />

      <div className="pt-16">
        <RegistrationHeader
          title="Institution Registration"
          subtitle="Transform your campus placements with our AI-powered recruitment platform. Join leading universities in revolutionizing the placement process."
          tagline="Complete setup in under 5 minutes"
          icon={<School className="w-10 h-10 text-white" />}
          color="blue"
          userType="institution"
        />
      </div>

      <div className="py-12 px-4">
        {/* 2. ADDED dark mode background to the form card */}
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg dark:bg-slate-800">
          {error && (
            // 3. ADDED dark mode styles for the error message
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md border border-red-200 dark:bg-red-900/50 dark:text-red-300 dark:border-red-500/50">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              label="Institution Name"
              value={formData.institutionName}
              onChange={(e) => setFormData({ ...formData, institutionName: e.target.value })}
              required
            />

            <FormInput
              label="Website"
              type="url"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
              required
            />

            <FormInput
              label="Contact Person"
              value={formData.contactPerson}
              onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
              required
            />

            <FormInput
              type="email"
              label="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />

            <FormInput
              type="password"
              label="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200 disabled:bg-blue-400 dark:hover:bg-blue-500 dark:disabled:bg-blue-800"
              disabled={loading}
            >
              {loading ? 'Registering...' : 'Register Institution'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
