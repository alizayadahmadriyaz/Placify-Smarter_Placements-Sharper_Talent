import { Briefcase } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import FormInput from '../../components/FormInput';

export default function EmployeeForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    currentCompany: '',
    jobTitle: '',
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        ...formData,
        role: 'employee'
      });

      setSuccess(res.data.message || 'Employee registered successfully!');
      setFormData({
        fullName: '',
        currentCompany: '',
        jobTitle: '',
        email: '',
        password: ''
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="text-green-600 h-8 w-8" />
        <h1 className="text-2xl font-bold text-gray-800">Employee Registration</h1>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Full Name"
          value={formData.fullName}
          onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          required
        />

        <FormInput
          label="Current Company"
          value={formData.currentCompany}
          onChange={(e) => setFormData({ ...formData, currentCompany: e.target.value })}
          required
        />

        <FormInput
          label="Job Title"
          value={formData.jobTitle}
          onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
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
          disabled={loading}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register as Employee'}
        </button>
      </form>
    </div>
  );
}
