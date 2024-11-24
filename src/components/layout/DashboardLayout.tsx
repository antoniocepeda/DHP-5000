import React, { useState, useTransition } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Users, LogOut, Menu, X, LayoutDashboard, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
      setIsMobileMenuOpen(false);
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-brand-light/50">
      {/* Mobile Menu Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 bg-white rounded-lg shadow-md"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6 text-gray-600" />
          ) : (
            <Menu className="w-6 h-6 text-gray-600" />
          )}
        </button>
      </div>

      {/* Sidebar - Desktop */}
      <aside className="hidden lg:block fixed top-0 left-0 h-full w-64 bg-white/70 backdrop-blur-md border-r border-gray-100">
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-gray-100">
            <div className="bg-gradient-to-r from-brand-purple to-brand-pink p-3 rounded-xl">
              <h2 className="text-lg font-semibold text-white">Diverse Healthcare Pros</h2>
            </div>
          </div>
          
          <nav className="flex-1 p-4 space-y-2">
            <button 
              onClick={() => handleNavigation('/dashboard')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-left ${
                location.pathname === '/dashboard' 
                  ? 'bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 text-brand-purple'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-brand-purple/5 hover:to-brand-pink/5'
              } transition-all`}
            >
              <LayoutDashboard className="w-5 h-5" />
              <span>Dashboard</span>
            </button>
            
            <button 
              onClick={() => handleNavigation('/questions')}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-left ${
                location.pathname === '/questions'
                  ? 'bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 text-brand-purple'
                  : 'text-gray-600 hover:bg-gradient-to-r hover:from-brand-purple/5 hover:to-brand-pink/5'
              } transition-all`}
            >
              <MessageSquare className="w-5 h-5" />
              <span>Questions</span>
            </button>
            
            {user?.role === 'admin' && (
              <button 
                onClick={() => handleNavigation('/experts')}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-left ${
                  location.pathname === '/experts'
                    ? 'bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 text-brand-purple'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-brand-purple/5 hover:to-brand-pink/5'
                } transition-all`}
              >
                <Users className="w-5 h-5" />
                <span>Experts</span>
              </button>
            )}
          </nav>
          
          <div className="p-4 m-4 border border-gray-100 rounded-xl bg-white/50">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-gray-900">{user?.name}</p>
                <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
              </div>
              <button
                onClick={logout}
                className="p-2 text-gray-500 hover:text-brand-pink rounded-lg hover:bg-brand-pink/5 transition-all"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Sidebar - Mobile */}
      <aside className={`lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${
        isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`w-64 h-full bg-white transform transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="h-full flex flex-col">
            <div className="p-6 border-b border-gray-100">
              <div className="bg-gradient-to-r from-brand-purple to-brand-pink p-3 rounded-xl">
                <h2 className="text-lg font-semibold text-white">Diverse Healthcare Pros</h2>
              </div>
            </div>
            
            <nav className="flex-1 p-4 space-y-2">
              <button 
                onClick={() => handleNavigation('/dashboard')}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-left ${
                  location.pathname === '/dashboard' 
                    ? 'bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 text-brand-purple'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-brand-purple/5 hover:to-brand-pink/5'
                } transition-all`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>Dashboard</span>
              </button>
              
              <button 
                onClick={() => handleNavigation('/questions')}
                className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-left ${
                  location.pathname === '/questions'
                    ? 'bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 text-brand-purple'
                    : 'text-gray-600 hover:bg-gradient-to-r hover:from-brand-purple/5 hover:to-brand-pink/5'
                } transition-all`}
              >
                <MessageSquare className="w-5 h-5" />
                <span>Questions</span>
              </button>
              
              {user?.role === 'admin' && (
                <button 
                  onClick={() => handleNavigation('/experts')}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl w-full text-left ${
                    location.pathname === '/experts'
                      ? 'bg-gradient-to-r from-brand-purple/10 to-brand-pink/10 text-brand-purple'
                      : 'text-gray-600 hover:bg-gradient-to-r hover:from-brand-purple/5 hover:to-brand-pink/5'
                  } transition-all`}
                >
                  <Users className="w-5 h-5" />
                  <span>Experts</span>
                </button>
              )}
            </nav>
            
            <div className="p-4 m-4 border border-gray-100 rounded-xl bg-white/50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                </div>
                <button
                  onClick={logout}
                  className="p-2 text-gray-500 hover:text-brand-pink rounded-lg hover:bg-brand-pink/5 transition-all"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 min-h-screen">
        <div className="p-4 lg:p-8 max-w-7xl pt-16 lg:pt-8">
          {children}
        </div>
      </main>
    </div>
  );
}