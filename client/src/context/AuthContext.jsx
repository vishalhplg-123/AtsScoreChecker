import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/authService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('resumeai_token');
      const storedUser = localStorage.getItem('resumeai_user');

      if (token) {
        if (storedUser) {
          try {
            setUser(JSON.parse(storedUser));
          } catch (e) {
            console.error('Failed to parse cached user', e);
          }
        }
        try {
          const res = await authService.getMe();
          if (res.user) {
            setUser(res.user);
            localStorage.setItem('resumeai_user', JSON.stringify(res.user));
          }
        } catch (err) {
          console.warn('Auth token expired or invalid', err);
          authService.logout();
          setUser(null);
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    const res = await authService.login({ email, password });
    setUser(res.user);
    return res;
  };

  const register = async (name, email, password) => {
    const res = await authService.register({ name, email, password });
    setUser(res.user);
    return res;
  };

  const demoLogin = async () => {
    return await login('vishal@example.com', 'password123');
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (data) => {
    const res = await authService.updateProfile(data);
    setUser(res.user);
    return res;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        login,
        register,
        demoLogin,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
};
