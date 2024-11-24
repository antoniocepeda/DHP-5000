import React, { useState, useTransition } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { KeyRound, Stethoscope, ArrowLeft } from 'lucide-react';

export default function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(username, password);
      startTransition(() => {
        navigate('/dashboard');
      });
    } catch (error) {
      // Error is handled by AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-brand-purple via-brand-orange via-brand-beige to-brand-pink flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex justify-between items-center mb-8">
          <Link
            to="/"
            className="text-brand-purple hover:text-brand-pink transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        <div className="flex justify-center mb-8">
          <div className="relative">
            <div className="bg-gradient-to-r from-brand-purple via-brand-orange to-brand-pink p-3 rounded-full">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-brand-beige via-brand-blue to-brand-pink p-2 rounded-full">
              <KeyRound className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Welcome to Diverse Healthcare Pros
        </h2>
        
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-lg mb-6">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-purple focus:border-transparent transition"
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-purple focus:border-transparent transition"
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-brand-purple via-brand-orange to-brand-pink text-white py-3 rounded-lg hover:opacity-90 transition duration-200 flex items-center justify-center space-x-2 font-medium"
          >
            <KeyRound className="w-5 h-5" />
            <span>Sign In</span>
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Demo Credentials:</p>
          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="font-medium text-gray-700">Admin:</p>
              <p>admin / admin</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Expert:</p>
              <p>expert / expert</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Consumer:</p>
              <p>consumer / consumer</p>
            </div>
            <div>
              <p className="font-medium text-gray-700">Provider:</p>
              <p>provider / provider</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}