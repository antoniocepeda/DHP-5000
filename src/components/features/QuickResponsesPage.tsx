import React from 'react';
import { ArrowLeft, Clock, Zap, BarChart } from 'lucide-react';
import { theme } from '../../styles/theme';

export default function QuickResponsesPage() {
  const handleRecruitment = () => {
    window.history.pushState({}, '', '/recruitment');
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-brand-orange/10 via-brand-beige/10 to-brand-pink/10">
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
            <div className="p-3 bg-gradient-to-r from-brand-orange to-brand-pink rounded-xl">
              <Clock className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Quick Response Times</h1>
          </div>
          <p className="text-xl text-gray-600">
            Get timely answers to your medical questions from our network of experts.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className={theme.components.card.base + ' p-8'}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 rounded-lg bg-brand-orange/10">
                <Zap className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl font-semibold">Response Timeline</h2>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-brand-orange">1-2h</span>
                </div>
                <div>
                  <h3 className="font-medium">Initial Review</h3>
                  <p className="text-gray-600">Question reviewed and assigned to relevant expert</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-brand-orange">24h</span>
                </div>
                <div>
                  <h3 className="font-medium">Expert Response</h3>
                  <p className="text-gray-600">Detailed answer from qualified professional</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-brand-orange/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-brand-orange">48h</span>
                </div>
                <div>
                  <h3 className="font-medium">Quality Check</h3>
                  <p className="text-gray-600">Peer review and final delivery</p>
                </div>
              </div>
            </div>
          </div>

          <div className={theme.components.card.base + ' p-8'}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-2 rounded-lg bg-brand-orange/10">
                <BarChart className="w-6 h-6 text-brand-orange" />
              </div>
              <h2 className="text-xl font-semibold">Response Statistics</h2>
            </div>
            <div className="space-y-6">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Average Response Time</span>
                  <span className="font-medium">18 hours</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-3/4 bg-gradient-to-r from-brand-orange to-brand-pink rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Questions Answered in 24h</span>
                  <span className="font-medium">92%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-[92%] bg-gradient-to-r from-brand-orange to-brand-pink rounded-full"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>User Satisfaction</span>
                  <span className="font-medium">98%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full">
                  <div className="h-full w-[98%] bg-gradient-to-r from-brand-orange to-brand-pink rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={theme.components.card.base + ' p-8'}>
          <h2 className="text-2xl font-semibold mb-6">Get Your Questions Answered Quickly</h2>
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