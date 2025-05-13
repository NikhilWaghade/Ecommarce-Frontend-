import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/api';
import { toast } from 'react-toastify';
import { useAdminAuth } from '../context/AdminAuthContext';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAdminAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('http://localhost:5000/api/auth/admin-login', { email, password });
      login(res.data.admin);
      toast.success('Login successful!', { autoClose: 1500 });
      navigate('/admin/panel');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-200">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required className="p-2 border rounded" />
          <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required className="p-2 border rounded" />
          <button type="submit" className="bg-green-600 text-white py-2 rounded">Login</button>
        </form>
        <p className="text-center mt-4 text-gray-500">
          Don&apos;t have an account? <a href="/admin/admin-signup" className="text-blue-600 underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
