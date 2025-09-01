// src/pages/AdminLogin.jsx
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
      const res = await API.post(
        '/auth/admin-login',
        { email, password },
        { withCredentials: true } // 🔐 Ensure credentials included
      );

      if (res.data && res.data.token) {
        login(res.data); // optionally store whole token+admin info
        toast.success('Login successful!', { autoClose: 1500 });

        // slight delay ensures context updates before route change
        setTimeout(() => {
          navigate('/admin/panel');
        }, 100);
      } else {
        toast.error('Login response invalid');
      }
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-blue-200">
      <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Admin Login</h2>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="on"
            spellCheck="false"
            className="p-2 border rounded"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="off"
            spellCheck="false"
            className="p-2 border rounded"
          />
          <button type="submit" className="bg-green-600 text-white py-2 rounded">Login</button>
        </form>
        <p className="text-center mt-4 text-gray-500">
          Don&apos;t have an account? <a href="/admin-signup" className="text-blue-600 underline">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
