import React from 'react';
import { ArrowLeft, Users, Globe2, BookOpen } from 'lucide-react';
import { theme } from '../../styles/theme';

export default function DiversePerspectivesPage() {
  const handleRecruitment = () => {
    window.history.pushState({}, '', '/recruitment');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-brand-beige/10 via-brand-blue/10 to-brand-pink/10">
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
            <div className="p-3 bg-gradient-to-r from-brand-beige to-brand-pink rounded-xl">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Diverse Perspectives</h1>
          </div>
          <p className="text-xl text-gray-600">
            Access insights from healthcare professionals with varied backgrounds and expertise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className={theme.components.card.base + ' p-8'}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 rounded-lg bg-brand-beige/10">
                <Globe2 className="w-6 h-6 text-brand-beige" />
              </div>
              <h2 className="text-xl font-semibold">Global Network</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-brand-beige to-brand-pink flex items-center justify-center text-white">
                  <span className="text-2xl font-bold">50+</span>
                </div>
                <div>
                  <h3 className="font-medium">Countries Represented</h3>
                  <p className="text-gray-600">Experts from diverse cultural backgrounds</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-brand-beige to-brand-pink flex items-center justify-center text-white">
                  <span className="text-2xl font-bold">30+</span>
                </div>
                <div>
                  <h3 className="font-medium">Languages</h3>
                  <p className="text-gray-600">Breaking down communication barriers</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-gradient-to-r from-brand-beige to-brand-pink flex items-center justify-center text-white">
                  <span className="text-2xl font-bold">25+</span>
                </div>
                <div>
                  <h3 className="font-medium">Specialties</h3>
                  <p className="text-gray-600">Comprehensive medical expertise</p>
                </div>
              </div>
            </div>
          </div>

          <div className={theme.components.card.base + ' p-8'}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 rounded-lg bg-brand-beige/10">
                <BookOpen className="w-6 h-6 text-brand-beige" />
              </div>
              <h2 className="text-xl font-semibold">Areas of Expertise</h2>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                'Internal Medicine',
                'Pediatrics',
                'Cardiology',
                'Neurology',
                'Oncology',
                'Dermatology',
                'Psychiatry',
                'Orthopedics',
                'Gynecology',
                'Endocrinology',
                'Pulmonology',
                'Gastroenterology'
              ].map((specialty, index) => (
                <div
                  key={index}
                  className="p-3 rounded-lg bg-brand-beige/5 text-gray-700 text-sm flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-brand-beige"></span>
                  {specialty}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={theme.components.card.base + ' p-8'}>
          <h2 className="text-2xl font-semibold mb-6">Experience Diverse Healthcare Perspectives</h2>
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