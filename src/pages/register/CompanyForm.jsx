import { Building2 } from 'lucide-react';
import { useState } from 'react';
import axios from 'axios';
import FormInput from '../../components/FormInput';

export default function CompanyForm() {
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    hrEmail: '',
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
        email: formData.hrEmail,
        companyName: formData.companyName,
        industry: formData.industry,
        hrEmail: formData.hrEmail,
        password: formData.password,
        role: 'company',
      });


      setSuccess(res.data.message || 'Company registered successfully!');
      setFormData({
        companyName: '',
        industry: '',
        hrEmail: '',
        password: ''
      });
    } catch (err) {
      console.error('Registration error:', err);
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center gap-3 mb-6">
        <Building2 className="text-orange-600 h-8 w-8" />
        <h1 className="text-2xl font-bold text-gray-800">Company Registration</h1>
      </div>

      {error && <p className="text-red-500 mb-2">{error}</p>}
      {success && <p className="text-green-500 mb-2">{success}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormInput
          label="Company Name"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          required
        />

        <FormInput
          label="Industry"
          value={formData.industry}
          onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
          required
        />

        <FormInput
          type="email"
          label="HR Contact Email"
          value={formData.hrEmail}
          onChange={(e) => setFormData({ ...formData, hrEmail: e.target.value })}
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
          className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? 'Registering...' : 'Register Company'}
        </button>
      </form>
    </div>
  );
}
