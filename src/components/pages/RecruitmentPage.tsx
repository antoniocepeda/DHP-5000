import React from 'react';
import { theme } from '../../styles/theme';
import { ArrowLeft, Award, Shield, Clock, Users, CheckCircle } from 'lucide-react';

export default function RecruitmentPage() {
  const handleApply = () => {
    window.history.pushState({}, '', '/apply');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-brand-purple/10 via-brand-orange/10 to-brand-pink/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-12">
          <a
            href="/"
            className="inline-flex items-center text-brand-purple hover:text-brand-pink mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </a>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Join Our Network of Medical Experts
          </h1>
          <p className="text-xl text-gray-600">
            Make a difference by sharing your expertise with patients seeking reliable medical information.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className={theme.components.card.base + ' p-8'}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 rounded-lg bg-brand-purple/10">
                <Shield className="w-6 h-6 text-brand-purple" />
              </div>
              <h2 className="text-xl font-semibold">Why Join Us?</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-purple" />
                <span>Flexible remote work opportunities</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-purple" />
                <span>Competitive compensation per case</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-purple" />
                <span>Choose cases matching your expertise</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-purple" />
                <span>Professional networking opportunities</span>
              </div>
              <div className="flex items-center gap-3">
                <CheckCircle className="w-5 h-5 text-brand-purple" />
                <span>Impact patients' lives directly</span>
              </div>
            </div>
          </div>

          <div className={theme.components.card.base + ' p-8'}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 rounded-lg bg-brand-purple/10">
                <Award className="w-6 h-6 text-brand-purple" />
              </div>
              <h2 className="text-xl font-semibold">Requirements</h2>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span>Active medical license in good standing</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span>Minimum 5 years of clinical experience</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span>Board certification in your specialty</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span>Excellent written communication skills</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <span>Commitment to evidence-based medicine</span>
              </div>
            </div>
          </div>
        </div>

        <div className={theme.components.card.base + ' p-8'}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Flexible Hours</h3>
              <p className="text-gray-600">Work on your own schedule</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-brand-orange to-brand-pink mb-4">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Global Impact</h3>
              <p className="text-gray-600">Help patients worldwide</p>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-brand-beige to-brand-pink mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold mb-2">Professional Growth</h3>
              <p className="text-gray-600">Expand your expertise</p>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={handleApply}
              className={theme.components.button.primary + ' px-8 py-3 text-lg'}
            >
              Apply Now
            </button>
            <p className="mt-4 text-sm text-gray-500">
              Already registered? <a href="/login" className="text-brand-purple hover:text-brand-pink">Sign in here</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}