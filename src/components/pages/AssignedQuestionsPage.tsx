import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { Search, Filter, ChevronDown, Clock } from 'lucide-react';
import { questionService } from '../../services/QuestionService';
import type { Question } from '../../types';
import { Select } from '../../components/common/Select';
import { Input } from '../../components/common/Input';
import LoadingSpinner from '../common/LoadingSpinner';

export default function AssignedQuestionsPage() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [expertFilter, setExpertFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const result = await questionService.getByStatus('assigned');
        setQuestions(result.questions);
      } catch (error) {
        console.error('Error loading questions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  if (loading) return <LoadingSpinner />;

  const experts = Array.from(new Set(questions.map(q => q.assignedTo))).filter(Boolean);
  const categories = Array.from(new Set(questions.map(q => q.category)));

  const filteredQuestions = questions.filter((question: Question) => {
    const matchesSearch = 
      question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      question.question.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesExpert = expertFilter === 'all' || question.assignedTo === expertFilter;
    const matchesCategory = categoryFilter === 'all' || question.category === categoryFilter;

    return matchesSearch && matchesExpert && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 text-gray-500 hover:text-brand-purple rounded-lg hover:bg-brand-purple/5"
        >
          ← Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Assigned Questions</h1>
          <p className="text-gray-500">Track and manage questions currently being handled by experts</p>
        </div>
      </div>

      <div className={theme.components.card.base + ' p-6'}>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
          {/* Mobile Filters Toggle */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="lg:hidden flex items-center gap-2 text-gray-600"
          >
            <Filter className="w-5 h-5" />
            Filters
            <ChevronDown className={`w-4 h-4 transform transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>

          {/* Desktop Filters */}
          <div className="hidden lg:flex items-center gap-4 w-full">
            <Input
              icon={<Search className="w-5 h-5" />}
              type="text"
              placeholder="Search assigned questions..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1"
            />

            <Select
              value={expertFilter}
              onChange={(e) => setExpertFilter(e.target.value)}
            >
              <option value="all">All Experts</option>
              {experts.map(expert => (
                <option key={expert} value={expert}>{expert}</option>
              ))}
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
        </div>

        {/* Mobile Filters */}
        <div className={`lg:hidden space-y-4 mb-6 ${showFilters ? 'block' : 'hidden'}`}>
          <Input
            icon={<Search className="w-5 h-5" />}
            type="text"
            placeholder="Search assigned questions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full"
          />

          <Select
            value={expertFilter}
            onChange={(e) => setExpertFilter(e.target.value)}
          >
            <option value="all">All Experts</option>
            {experts.map(expert => (
              <option key={expert} value={expert}>{expert}</option>
            ))}
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

        {/* Questions List */}
        <div className="space-y-4">
          {filteredQuestions.map(question => (
            <div
              key={question.id}
              onClick={() => navigate(`/questions/${question.id}`)}
              className="border border-gray-100 rounded-xl p-6 hover:bg-gray-50 cursor-pointer"
            >
              <div className="flex flex-col lg:flex-row justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-medium text-gray-900">{question.title}</h3>
                  <p className="text-sm text-gray-500">{question.category}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-brand-orange">
                  <Clock className="w-4 h-4" />
                  <span>
                    {Math.floor((new Date().getTime() - new Date(question.submittedAt).getTime()) / (1000 * 60 * 60))}h ago
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                {question.question}
              </p>

              <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-2">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink flex items-center justify-center">
                    <span className="text-white text-sm">
                      {question.assignedTo?.[0]}
                    </span>
                  </div>
                  <span className="text-sm text-gray-600">
                    Assigned to {question.assignedTo}
                  </span>
                </div>
                <button className="text-brand-purple hover:text-brand-pink text-sm font-medium">
                  View Details →
                </button>
              </div>
            </div>
          ))}

          {filteredQuestions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No assigned questions found matching your criteria
            </div>
          )}
        </div>
      </div>
    </div>
  );
}