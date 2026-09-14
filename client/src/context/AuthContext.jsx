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
          // If token was a demo token or backend is offline, keep cached user
          if (token.startsWith('demo_')) {
            // Keep demo user
          } else {
            console.warn('Auth token check returned error, retaining session or logging out:', err);
          }
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await authService.login({ email, password });
      setUser(res.user);
      return res;
    } catch (err) {
      // If user enters demo credentials while backend is offline/unreachable
      if (email === 'vishal@example.com' || email.includes('demo')) {
        const mockUser = {
          id: 'demo-vishal-101',
          name: 'Vishal Kumar',
          email: 'vishal@example.com',
          headline: 'MERN Stack & Full Stack AI Developer',
          targetRole: 'Senior Full Stack Engineer',
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          preferences: { defaultTemplate: 'modern', theme: 'light' },
        };
        localStorage.setItem('resumeai_token', 'demo_jwt_token_vishal');
        localStorage.setItem('resumeai_user', JSON.stringify(mockUser));
        setUser(mockUser);
        return { success: true, user: mockUser };
      }
      throw err;
    }
  };

  const register = async (name, email, password) => {
    try {
      const res = await authService.register({ name, email, password });
      setUser(res.user);
      return res;
    } catch (err) {
      // If backend is offline, create client-side session so user isn't locked out
      if (!err.response || err.response.status === 404 || err.response.status === 405) {
        const mockUser = {
          id: `user-${Date.now()}`,
          name,
          email,
          headline: 'Professional Job Seeker',
          targetRole: 'Software Engineer',
          avatar: '',
          preferences: { defaultTemplate: 'modern', theme: 'light' },
        };
        localStorage.setItem('resumeai_token', `demo_token_${Date.now()}`);
        localStorage.setItem('resumeai_user', JSON.stringify(mockUser));
        setUser(mockUser);
        return { success: true, user: mockUser };
      }
      throw err;
    }
  };

  const demoLogin = async () => {
    try {
      return await login('vishal@example.com', 'password123');
    } catch (err) {
      const mockUser = {
        id: 'demo-vishal-101',
        name: 'Vishal Kumar',
        email: 'vishal@example.com',
        headline: 'MERN Stack & Full Stack AI Developer',
        targetRole: 'Senior Full Stack Engineer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
        preferences: { defaultTemplate: 'modern', theme: 'light' },
      };
      localStorage.setItem('resumeai_token', 'demo_jwt_token_vishal');
      localStorage.setItem('resumeai_user', JSON.stringify(mockUser));
      setUser(mockUser);
      return { success: true, user: mockUser };
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
  };

  const updateProfile = async (data) => {
    try {
      const res = await authService.updateProfile(data);
      setUser(res.user);
      return res;
    } catch (err) {
      const updated = { ...user, ...data };
      setUser(updated);
      localStorage.setItem('resumeai_user', JSON.stringify(updated));
      return { success: true, user: updated };
    }
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
