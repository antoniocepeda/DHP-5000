import React, { useState, useTransition, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Clock, CheckCircle, AlertTriangle, ArrowUpDown } from 'lucide-react';
import { getAssignedTickets, getUnassignedTickets, getCompletedTickets } from '../../data/tickets';
import { questionService } from '../../services/QuestionService';
import type { Question } from '../../types';
import LoadingSpinner from '../common/LoadingSpinner';

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [isPending, startTransition] = useTransition();
  const [sortField, setSortField] = useState<keyof Question>('id');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        // Get questions by status
        const unassigned = await questionService.getByStatus('unassigned');
        const assigned = await questionService.getByStatus('assigned');
        const completed = await questionService.getByStatus('completed');
        
        setQuestions([
          ...unassigned.questions,
          ...assigned.questions,
          ...completed.questions
        ]);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading questions: {error.message}</div>;

  const unassignedQuestions = questions.filter(q => q.status === 'unassigned');
  const assignedQuestions = questions.filter(q => q.status === 'assigned');
  const completedQuestions = questions.filter(q => q.status === 'completed');

  const handleSort = (field: keyof Question) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'unassigned':
        return 'bg-yellow-100 text-yellow-800';
      case 'assigned':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    let aValue = a[sortField];
    let bValue = b[sortField];

    // Handle special cases for nested or null values
    if (sortField === 'assignedTo') {
      aValue = a.assignedTo || '';
      bValue = b.assignedTo || '';
    }

    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const handleNavigation = (path: string) => {
    startTransition(() => {
      navigate(path);
    });
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => handleNavigation('/questions?filter=assigned')}
          className={`${theme.components.card.base} ${theme.components.card.hover} p-6 cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Assigned Questions</h3>
            <div className="p-2 bg-brand-orange/10 rounded-lg">
              <Clock className="w-5 h-5 text-brand-orange" />
            </div>
          </div>
          <p className="text-3xl font-bold text-brand-orange">{assignedQuestions.length}</p>
          <p className="text-sm text-gray-500 mt-2">Currently being handled</p>
        </div>

        <div 
          onClick={() => handleNavigation('/questions?filter=unassigned')}
          className={`${theme.components.card.base} ${theme.components.card.hover} p-6 cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Unassigned Questions</h3>
            <div className="p-2 bg-brand-purple/10 rounded-lg">
              <AlertTriangle className="w-5 h-5 text-brand-purple" />
            </div>
          </div>
          <p className="text-3xl font-bold text-brand-purple">{unassignedQuestions.length}</p>
          <p className="text-sm text-gray-500 mt-2">Awaiting assignment</p>
        </div>

        <div 
          onClick={() => handleNavigation('/questions?filter=completed')}
          className={`${theme.components.card.base} ${theme.components.card.hover} p-6 cursor-pointer`}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">Completed Questions</h3>
            <div className="p-2 bg-brand-pink/10 rounded-lg">
              <CheckCircle className="w-5 h-5 text-brand-pink" />
            </div>
          </div>
          <p className="text-3xl font-bold text-brand-pink">{completedQuestions.length}</p>
          <p className="text-sm text-gray-500 mt-2">Successfully resolved</p>
        </div>
      </div>

      <div className={theme.components.card.base}>
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-medium text-gray-900">All Questions</h2>
        </div>
        <div className="p-6 overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm font-medium text-gray-500">
                <th 
                  className="pb-4 cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('id')}
                >
                  <div className="flex items-center gap-2">
                    ID
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th 
                  className="pb-4 cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('title')}
                >
                  <div className="flex items-center gap-2">
                    Question
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th 
                  className="pb-4 cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('category')}
                >
                  <div className="flex items-center gap-2">
                    Category
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th 
                  className="pb-4 cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('status')}
                >
                  <div className="flex items-center gap-2">
                    Status
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th 
                  className="pb-4 cursor-pointer hover:text-gray-700"
                  onClick={() => handleSort('assignedTo')}
                >
                  <div className="flex items-center gap-2">
                    Assigned To
                    <ArrowUpDown className="w-4 h-4" />
                  </div>
                </th>
                <th className="pb-4">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {sortedQuestions.map(question => (
                <tr key={question.id} className="border-t border-gray-100">
                  <td className="py-4">#{question.id}</td>
                  <td className="py-4">{question.title}</td>
                  <td className="py-4">{question.category}</td>
                  <td className="py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(question.status)}`}>
                      {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
                    </span>
                  </td>
                  <td className="py-4">{question.assignedTo || 'Unassigned'}</td>
                  <td className="py-4">
                    <button 
                      onClick={() => navigate(`/questions/${question.id}`)}
                      className="text-brand-purple hover:text-brand-pink"
                    >
                      View Details →
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}