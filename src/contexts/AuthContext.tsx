import React, { createContext, useContext, useState } from 'react';
import type { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string | null>(null);

  const login = async (username: string, password: string) => {
    try {
      setError(null);
      
      // Validate credentials
      if (!username || !password) {
        throw new Error('Please provide both username and password');
      }

      // Admin login
      if (username === 'admin' && password === 'admin') {
        setUser({
          id: '1',
          name: 'Admin User',
          email: 'admin@dhp.com',
          role: 'admin'
        });
        return;
      }

      // Expert login
      if (username === 'expert' && password === 'expert') {
        setUser({
          id: 'E001',
          name: 'Dr. Sarah Smith',
          email: 'expert@dhp.com',
          role: 'expert'
        });
        return;
      }

      // Consumer login
      if (username === 'consumer' && password === 'consumer') {
        setUser({
          id: 'C001',
          name: 'John Doe',
          email: 'consumer@example.com',
          role: 'consumer'
        });
        return;
      }

      // Provider login
      if (username === 'provider' && password === 'provider') {
        setUser({
          id: 'P001',
          name: 'Dr. Jane Wilson',
          email: 'provider@hospital.com',
          role: 'provider'
        });
        return;
      }

      throw new Error('Invalid credentials');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred during login');
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setError(null);
    window.history.pushState({}, '', '/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};