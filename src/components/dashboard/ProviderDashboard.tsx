import React, { useTransition, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Users, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { questionService } from '../../services/QuestionService';
import type { Question } from '../../types';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ProviderDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      if (!user?.id) return;
      try {
        const result = await questionService.getByProviderId(user.id);
        setQuestions(result.questions);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [user]);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading questions: {error.message}</div>;

  const activeQuestions = questions.filter(q => q.status !== 'completed');
  const completedQuestions = questions.filter(q => q.status === 'completed');

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Provider Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div 
          onClick={() => handleNavigation('/questions?filter=patients')}
          className={`${theme.components.card.base} ${theme.components.card.hover} p-6 cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Total Patients</h3>
            <div className="p-2 bg-brand-purple/10 rounded-lg">
              <Users className="w-5 h-5 text-brand-purple" />
            </div>
          </div>
          <p className="text-3xl font-bold text-brand-purple">
            {new Set(questions.map(q => q.userId)).size}
          </p>
          <p className="text-sm text-gray-500 mt-2">Unique patients</p>
        </div>

        <div 
          onClick={() => handleNavigation('/questions?filter=active')}
          className={`${theme.components.card.base} ${theme.components.card.hover} p-6 cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Active Cases</h3>
            <div className="p-2 bg-brand-orange/10 rounded-lg">
              <Clock className="w-5 h-5 text-brand-orange" />
            </div>
          </div>
          <p className="text-3xl font-bold text-brand-orange">{activeQuestions.length}</p>
          <p className="text-sm text-gray-500 mt-2">Pending responses</p>
        </div>

        <div 
          onClick={() => handleNavigation('/questions?filter=completed')}
          className={`${theme.components.card.base} ${theme.components.card.hover} p-6 cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Completed</h3>
            <div className="p-2 bg-brand-pink/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-brand-pink" />
            </div>
          </div>
          <p className="text-3xl font-bold text-brand-pink">{completedQuestions.length}</p>
          <p className="text-sm text-gray-500 mt-2">Cases resolved</p>
        </div>

        <div 
          onClick={() => handleNavigation('/questions?filter=all')}
          className={`${theme.components.card.base} ${theme.components.card.hover} p-6 cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Messages</h3>
            <div className="p-2 bg-brand-beige/10 rounded-lg">
              <MessageSquare className="w-5 h-5 text-brand-beige" />
            </div>
          </div>
          <p className="text-3xl font-bold text-brand-beige">
            {questions.reduce((sum, q) => sum + (q.messages?.length || 0), 0)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Total interactions</p>
        </div>
      </div>

      <div className={theme.components.card.base}>
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Recent Cases</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {questions.slice(0, 5).map(q => (
              <div
                key={q.id}
                onClick={() => handleNavigation(`/questions/${q.id}`)}
                className="border border-gray-100 rounded-xl p-6 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{q.title}</h3>
                    <p className="text-sm text-gray-500">{q.category}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    q.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {q.status.replace('_', ' ').charAt(0).toUpperCase() + q.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{q.question}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    Last updated: {new Date(q.updatedAt || q.submittedAt).toLocaleDateString()}
                  </span>
                  <span className="text-brand-purple">View Details →</span>
                </div>
              </div>
            ))}

            {questions.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No cases assigned yet
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}