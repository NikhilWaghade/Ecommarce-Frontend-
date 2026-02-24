// src/context/AdminAuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check localStorage on mount
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedAdmin = localStorage.getItem('admin');
        const storedToken = localStorage.getItem('adminToken');
        
        console.log('Checking stored admin data...');
        
        if (storedAdmin && storedToken) {
          const parsedAdmin = JSON.parse(storedAdmin);
          console.log('Found stored admin:', parsedAdmin?.admin?.email || parsedAdmin?.email);
          setAdmin(parsedAdmin);
        } else {
          console.log('No stored admin session found');
        }
      } catch (error) {
        console.error('Error parsing admin data:', error);
        localStorage.removeItem('admin');
        localStorage.removeItem('adminToken');
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = (adminData) => {
    console.log('Logging in admin:', adminData?.admin?.email || adminData?.email);
    setAdmin(adminData);
    localStorage.setItem('admin', JSON.stringify(adminData));
    if (adminData.token) {
      localStorage.setItem('adminToken', adminData.token);
    }
  };

  const logout = () => {
    console.log('Logging out admin');
    setAdmin(null);
    localStorage.removeItem('admin');
    localStorage.removeItem('adminToken');
  };

  const isAuthenticated = () => {
    return !!admin && !!localStorage.getItem('adminToken');
  };

  return (
    <AdminAuthContext.Provider value={{ admin, login, logout, isLoading, isAuthenticated }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
