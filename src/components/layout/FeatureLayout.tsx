import { ArrowLeft } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

interface FeatureLayoutProps {
  title: string;
  description: string;
  icon: LucideIcon;
  gradient: string;
  children: React.ReactNode;
}

export default function FeatureLayout({
  title,
  description,
  icon: Icon,
  gradient,
  children
}: FeatureLayoutProps) {
  return (
    <div className={`min-h-screen ${gradient}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <a href="/" className="inline-flex items-center text-brand-purple hover:text-brand-pink mb-6">
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </a>
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-brand-purple to-brand-pink rounded-xl">
              <Icon className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
          </div>
          <p className="text-xl text-gray-600">{description}</p>
        </div>
        {children}
      </div>
    </div>
  );
} 