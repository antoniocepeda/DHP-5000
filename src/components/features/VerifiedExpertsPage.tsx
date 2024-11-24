import React from 'react';
import { ArrowLeft, Shield, CheckCircle, Award } from 'lucide-react';
import { theme } from '../../styles/theme';

export default function VerifiedExpertsPage() {
  const handleRecruitment = () => {
    window.history.pushState({}, '', '/recruitment');
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
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-gradient-to-r from-brand-purple to-brand-pink rounded-xl">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Verified Medical Experts</h1>
          </div>
          <p className="text-xl text-gray-600">
            Our rigorous verification process ensures you receive advice from qualified healthcare professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className={theme.components.card.base + ' p-8'}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 rounded-lg bg-brand-purple/10">
                <CheckCircle className="w-6 h-6 text-brand-purple" />
              </div>
              <h2 className="text-xl font-semibold">Verification Process</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-brand-purple">•</span>
                <span>Credential verification with medical boards</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-purple">•</span>
                <span>Background checks and practice history review</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-purple">•</span>
                <span>Specialty certification validation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-purple">•</span>
                <span>Regular re-verification process</span>
              </li>
            </ul>
          </div>

          <div className={theme.components.card.base + ' p-8'}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 rounded-lg bg-brand-purple/10">
                <Award className="w-6 h-6 text-brand-purple" />
              </div>
              <h2 className="text-xl font-semibold">Expert Qualifications</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="text-brand-purple">•</span>
                <span>Board-certified physicians and specialists</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-purple">•</span>
                <span>Minimum 5 years of clinical experience</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-purple">•</span>
                <span>Active medical licenses in good standing</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-brand-purple">•</span>
                <span>Ongoing professional development</span>
              </li>
            </ul>
          </div>
        </div>

        <div className={theme.components.card.base + ' p-8'}>
          <h2 className="text-2xl font-semibold mb-6">Ready to Join Our Expert Network?</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="/ask"
              className={theme.components.button.primary + ' px-6 py-3 text-center'}
            >
              Ask Your Question
            </a>
            <button
              onClick={handleRecruitment}
              className={theme.components.button.secondary + ' px-6 py-3 text-center'}
            >
              Medical Expert? Join Us
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}