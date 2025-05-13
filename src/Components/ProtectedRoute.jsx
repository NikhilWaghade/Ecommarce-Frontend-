import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';

const ProtectedRoute = ({ children }) => {
  const { admin } = useAdminAuth();
  return admin ? children : <Navigate to="/admin/admin-login" />;
};

export default ProtectedRoute;
