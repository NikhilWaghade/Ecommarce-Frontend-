import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { toast } from 'react-toastify';

const AdminSignup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('http://localhost:5000/api/auth/admin-signup', { name, email, password });
      toast.success(res.data.message || 'Signup successful!');
      navigate('/admin-login');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-200">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Admin Signup</h2>
        <form onSubmit={handleSignup} className="flex flex-col gap-4">
          <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required className="p-2 border rounded" />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-2 border rounded" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-2 border rounded" />
          <button type="submit" className="bg-green-600 text-white py-2 rounded">Sign Up</button>
        </form>
        <p className="text-center mt-4 text-gray-500">
          Already an admin? <a href="/admin-login" className="text-blue-600 underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default AdminSignup;
