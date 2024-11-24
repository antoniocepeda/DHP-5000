import React, { useTransition } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Users, Clock, CheckCircle, MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { tickets } from '../../data/tickets';

export default function ProviderDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();

  const providerTickets = tickets.filter(ticket => ticket.providerId === user?.id);
  const activeTickets = providerTickets.filter(ticket => ticket.status !== 'completed');
  const completedTickets = providerTickets.filter(ticket => ticket.status === 'completed');

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
            {new Set(providerTickets.map(t => t.userId)).size}
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
          <p className="text-3xl font-bold text-brand-orange">{activeTickets.length}</p>
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
          <p className="text-3xl font-bold text-brand-pink">{completedTickets.length}</p>
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
            {providerTickets.reduce((sum, ticket) => sum + (ticket.messages?.length || 0), 0)}
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
            {providerTickets.slice(0, 5).map(ticket => (
              <div
                key={ticket.id}
                onClick={() => handleNavigation(`/questions/${ticket.id}`)}
                className="border border-gray-100 rounded-xl p-6 hover:bg-gray-50 cursor-pointer"
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900">{ticket.title}</h3>
                    <p className="text-sm text-gray-500">{ticket.category}</p>
                  </div>
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
                    Last updated: {new Date(ticket.updatedAt || ticket.submittedAt).toLocaleDateString()}
                  </span>
                  <span className="text-brand-purple">View Details →</span>
                </div>
              </div>
            ))}

            {providerTickets.length === 0 && (
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