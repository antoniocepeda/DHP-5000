import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useQuestions } from '../../hooks/useQuestions';
import LoadingSpinner from '../common/LoadingSpinner';
import { questionService } from '../../services/QuestionService';

export default function QuestionsPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');

  // Replace tickets.ts with useQuestions hook
  const { questions, loading, error } = useQuestions(
    user?.role === 'expert' ? { assignee: user?.name } : {}
  );

  // Filter questions based on search and filters
  const filteredQuestions = questions.filter((question) => {
    const matchesSearch = 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.question.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || question.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || question.category === categoryFilter;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  const categories = Array.from(new Set(questions.map(q => q.category)));

  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading questions: {error.message}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">
          {user?.role === 'admin' ? 'All Questions' : 'My Questions'}
        </h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="all">All Status</option>
            <option value="unassigned">Unassigned</option>
            <option value="assigned">Assigned</option>
            <option value="completed">Completed</option>
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Questions List */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="space-y-4">
          {filteredQuestions.map(question => (
            <div
              key={question.id}
              onClick={() => navigate(`/questions/${question.id}`)}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            >
              <h3 className="font-medium text-gray-900">{question.title}</h3>
              <p className="text-gray-500 mt-1">{question.question}</p>
              <div className="flex gap-2 mt-2">
                <span className="text-sm text-brand-purple">{question.category}</span>
                <span className="text-sm text-gray-500">•</span>
                <span className="text-sm text-gray-500">{question.status}</span>
              </div>
            </div>
          ))}
          
          {filteredQuestions.length === 0 && (
            <div className="text-center text-gray-500 py-8">
              No questions found
            </div>
          )}
        </div>
      )}
    </div>
  );
}