import React, { useTransition, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { questionService } from '../../services/QuestionService';
import type { Question } from '../../types';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ExpertDashboard() {
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
        const result = await questionService.getByAssignedTo(user.id);
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

  const activeQuestions = questions.filter(q => q.status === 'assigned');
  const completedQuestions = questions.filter(q => q.status === 'completed');

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  const handleViewTicket = (ticketId: string) => {
    handleNavigation(`/questions/${ticketId}`);
  };

  const handleViewAllTickets = () => {
    handleNavigation('/questions');
  };

  // Filter tickets assigned to the current expert
  const expertTickets = questions.filter(ticket => ticket.assignedTo === user?.name);
  
  const assignedCount = expertTickets.filter(t => t.status === 'assigned').length;
  const completedCount = expertTickets.filter(t => t.status === 'completed').length;

  // Get recent assigned tickets
  const recentAssignedTickets = expertTickets
    .sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900">Expert Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div 
          onClick={() => handleNavigation('/questions?filter=assigned')}
          className={`${theme.components.card.base} ${theme.components.card.hover} p-6 cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Assigned</h3>
            <div className="p-2 bg-brand-purple/10 rounded-lg">
              <Clock className="w-5 h-5 text-brand-purple" />
            </div>
          </div>
          <p className="text-3xl font-bold text-brand-purple">{assignedCount}</p>
          <p className="text-sm text-gray-500 mt-2">Active cases</p>
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
          <p className="text-3xl font-bold text-brand-pink">{completedCount}</p>
          <p className="text-sm text-gray-500 mt-2">Successfully answered</p>
        </div>
      </div>

      <div className={theme.components.card.base}>
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium text-gray-900">My Assigned Tickets</h2>
            <button 
              onClick={handleViewAllTickets}
              className={theme.components.button.secondary + ' px-4 py-2'}
            >
              View All
            </button>
          </div>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentAssignedTickets.map(ticket => (
              <div 
                key={ticket.id}
                onClick={() => handleViewTicket(ticket.id)}
                className="border border-gray-100 rounded-xl p-6 bg-white/50 hover:bg-white/70 transition-all cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{ticket.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ticket.status === 'completed'
                      ? 'bg-brand-purple/10 text-brand-purple'
                      : 'bg-brand-orange/10 text-brand-orange'
                  }`}>
                    {ticket.status.charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                  {ticket.question}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">
                    Due: {new Date(ticket.submittedAt).toLocaleDateString()}
                  </span>
                  <button className="text-brand-purple hover:text-brand-pink text-sm font-medium">
                    {ticket.status === 'completed' ? 'View Details' : 'Continue Working'} →
                  </button>
                </div>
              </div>
            ))}

            {recentAssignedTickets.length === 0 && (
              <p className="text-center text-gray-500 py-4">
                No tickets assigned yet
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}