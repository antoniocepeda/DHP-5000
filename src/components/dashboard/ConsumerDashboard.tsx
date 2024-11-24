import React, { useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Clock, CheckCircle, MessageSquare, Plus } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { tickets } from '../../data/tickets';

export default function ConsumerDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const userTickets = tickets.filter(ticket => ticket.userId === user?.id);
  const activeTickets = userTickets.filter(ticket => ticket.status !== 'completed');
  const completedTickets = userTickets.filter(ticket => ticket.status === 'completed');

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Health Questions</h1>
        <button
          onClick={() => handleNavigation('/ask')}
          className={theme.components.button.primary + ' px-6 py-2 mt-4'}
        >
          Ask a Question
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className={theme.components.card.base + ' p-6'}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Active Questions</h3>
            <div className="p-2 bg-brand-purple/10 rounded-lg">
              <Clock className="w-5 h-5 text-brand-purple" />
            </div>
          </div>
          <p className="text-3xl font-bold text-brand-purple">{activeTickets.length}</p>
          <p className="text-sm text-gray-500 mt-2">Awaiting responses</p>
        </div>

        <div className={theme.components.card.base + ' p-6'}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Answered</h3>
            <div className="p-2 bg-brand-pink/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-brand-pink" />
            </div>
          </div>
          <p className="text-3xl font-bold text-brand-pink">{completedTickets.length}</p>
          <p className="text-sm text-gray-500 mt-2">Questions answered</p>
        </div>

        <div className={theme.components.card.base + ' p-6'}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Messages</h3>
            <div className="p-2 bg-brand-orange/10 rounded-lg">
              <MessageSquare className="w-5 h-5 text-brand-orange" />
            </div>
          </div>
          <p className="text-3xl font-bold text-brand-orange">
            {userTickets.reduce((sum, ticket) => sum + (ticket.messages?.length || 0), 0)}
          </p>
          <p className="text-sm text-gray-500 mt-2">Total interactions</p>
        </div>
      </div>

      <div className={theme.components.card.base}>
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">Recent Questions</h2>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {userTickets.slice(0, 5).map(ticket => (
              <div
                key={ticket.id}
                onClick={() => handleNavigation(`/tickets/${ticket.id}`)}
                className="border border-gray-100 rounded-xl p-6 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-medium text-gray-900">{ticket.title}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    ticket.status === 'completed'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {ticket.status.replace('_', ' ').charAt(0).toUpperCase() + ticket.status.slice(1)}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{ticket.question}</p>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-500">
                    {new Date(ticket.submittedAt).toLocaleDateString()}
                  </span>
                  <span className="text-brand-purple">View Details →</span>
                </div>
              </div>
            ))}

            {userTickets.length === 0 && (
              <div className="text-center py-8">
                <p className="text-gray-500">No questions yet. Ask your first question!</p>
                <button
                  onClick={() => handleNavigation('/ask')}
                  className={theme.components.button.primary + ' px-6 py-2 mt-4'}
                >
                  Ask a Question
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}