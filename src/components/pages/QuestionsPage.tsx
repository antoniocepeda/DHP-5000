import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Filter, Search, Clock, CheckCircle, AlertTriangle, ChevronDown } from 'lucide-react';
import { tickets } from '../../data/tickets';
import { useAuth } from '../../contexts/AuthContext';
import type { Question, QuestionStatus } from '../../types';
import { Input } from '../common/Input';
import { Select } from '../common/Select';

export default function QuestionsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<QuestionStatus | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);

  // Get filter from URL params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const filterParam = params.get('filter');
    if (filterParam && ['assigned', 'unassigned', 'completed'].includes(filterParam)) {
      setStatusFilter(filterParam as QuestionStatus);
    }
  }, []);

  const handleViewQuestion = (questionId: string) => {
    navigate(`/questions/${questionId}`);
  };

  const getStatusColor = (status: QuestionStatus) => {
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

  const getStatusIcon = (status: QuestionStatus) => {
    switch (status) {
      case 'unassigned':
        return <AlertTriangle className="w-4 h-4" />;
      case 'assigned':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Filter questions based on user role
  const userQuestions = (() => {
    switch (user?.role) {
      case 'admin':
        return tickets;
      case 'expert':
        return tickets.filter(ticket => ticket.assignedTo === user?.name);
      case 'consumer':
        return tickets.filter(ticket => ticket.userId === user?.id);
      case 'provider':
        return tickets.filter(ticket => ticket.providerId === user?.id);
      default:
        return [];
    }
  })();

  const filteredQuestions = userQuestions.filter((question: Question) => {
    const matchesSearch = 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.question.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || question.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || question.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(tickets.map(ticket => ticket.category)));

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {user?.role === 'admin' ? 'All Questions' : 'My Questions'}
        </h1>
        
        {/* Mobile Filters Toggle */}
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="lg:hidden flex items-center gap-2 text-gray-600"
        >
          <Filter className="w-5 h-5" />
          Filters
          <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
        </button>

        {/* Filters - Desktop */}
        <div className="hidden lg:flex items-center gap-4 w-full lg:w-auto">
          <Input
            icon={<Search className="w-5 h-5" />}
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 lg:min-w-[400px]"
          />
          
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as QuestionStatus | 'all')}
          >
            <option value="all">All Statuses</option>
            <option value="unassigned">Unassigned</option>
            <option value="assigned">Assigned</option>
            <option value="completed">Completed</option>
          </Select>

          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
        </div>

        {/* Filters - Mobile */}
        <div className={`lg:hidden w-full space-y-4 ${showFilters ? 'block' : 'hidden'}`}>
          <Input
            icon={<Search className="w-5 h-5" />}
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />
          
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as QuestionStatus | 'all')}
            className={theme.components.input.base + ' py-2 w-full'}
          >
            <option value="all">All Statuses</option>
            <option value="unassigned">Unassigned</option>
            <option value="assigned">Assigned</option>
            <option value="completed">Completed</option>
          </Select>

          <Select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className={theme.components.input.base + ' py-2 w-full'}
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid gap-4">
        {filteredQuestions.map((question: Question) => (
          <div
            key={question.id}
            onClick={() => handleViewQuestion(question.id)}
            className={`${theme.components.card.base} ${theme.components.card.hover} p-6 cursor-pointer`}
          >
            <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4 mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{question.title}</h3>
                <p className="text-sm text-gray-500 mt-1">{question.category}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1 w-fit ${getStatusColor(question.status)}`}>
                {getStatusIcon(question.status)}
                {question.status.charAt(0).toUpperCase() + question.status.slice(1)}
              </span>
            </div>
            
            <p className="text-sm text-gray-600 line-clamp-2 mb-4">
              {question.question}
            </p>
            
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2 text-sm">
              <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
                <span className="text-gray-500">
                  Submitted: {new Date(question.submittedAt).toLocaleDateString()}
                </span>
                {question.assignedTo && (
                  <span className="text-gray-500">
                    Assigned: {question.assignedTo}
                  </span>
                )}
              </div>
              <button className="text-brand-purple hover:text-brand-pink font-medium">
                View Details →
              </button>
            </div>
          </div>
        ))}

        {filteredQuestions.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No questions found matching your criteria
          </div>
        )}
      </div>
    </div>
  );
}