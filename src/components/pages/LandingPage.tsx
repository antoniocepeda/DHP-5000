import React, { useTransition } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowRight, Shield, Users, Clock } from 'lucide-react';

export default function LandingPage() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  const handleFeatureClick = (feature: string) => {
    handleNavigation(`/features/${feature}`);
  };

  return (
    <div className="h-screen flex flex-col bg-white">
      {/* Hero Section */}
      <div className="flex-1 bg-gradient-to-r from-brand-purple via-brand-orange via-brand-beige to-brand-pink/90">
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
              Expert Medical Answers from
              <span className="text-brand-light"> Diverse Healthcare Pros</span>
            </h1>
            <p className="text-lg text-white/90 mb-6 max-w-2xl mx-auto">
              Get reliable answers to your health questions from our network of verified medical experts.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleNavigation('/ask')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 bg-white text-brand-purple font-medium rounded-lg hover:bg-brand-light transition duration-200"
              >
                Ask Your Question
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
              <button
                onClick={() => handleNavigation('/login')}
                className="w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border-2 border-white text-white font-medium rounded-lg hover:bg-white/10 transition duration-200"
              >
                Medical Expert? Sign In
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div 
              className="flex items-center space-x-4 group cursor-pointer"
              onClick={() => handleFeatureClick('verified-experts')}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-brand-purple via-brand-orange to-brand-beige transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <Shield className="w-5 h-5 text-white transform transition-all duration-300 group-hover:rotate-12" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Verified Experts</h3>
                <p className="text-sm text-gray-600">All our medical experts are certified professionals</p>
              </div>
            </div>
            
            <div 
              className="flex items-center space-x-4 group cursor-pointer"
              onClick={() => handleFeatureClick('quick-responses')}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-brand-orange via-brand-beige to-brand-pink transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <Clock className="w-5 h-5 text-white transform transition-all duration-300 group-hover:rotate-12" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Quick Responses</h3>
                <p className="text-sm text-gray-600">Get answers within 24-48 hours</p>
              </div>
            </div>
            
            <div 
              className="flex items-center space-x-4 group cursor-pointer"
              onClick={() => handleFeatureClick('diverse-perspectives')}
            >
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-brand-beige via-brand-blue to-brand-pink transform transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
                <Users className="w-5 h-5 text-white transform transition-all duration-300 group-hover:rotate-12" />
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-1">Diverse Perspectives</h3>
                <p className="text-sm text-gray-600">Access insights from varied backgrounds</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}