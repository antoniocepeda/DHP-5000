import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { theme } from '../../styles/theme';
import { ArrowLeft, Clock, MessageSquare, User, Calendar, Tag } from 'lucide-react';
import { getTicketById, updateTicket } from '../../data/tickets';
import { experts } from '../../data/experts';
import type { Question, QuestionStatus } from '../../types';
import { Select } from '../common/Select';

const CATEGORIES = [
  'Chemistry',
  'Immunology',
  'Immunohematology',
  'Hematology',
  'Hemostasis',
  'Microbiology'
];

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [question, setQuestion] = useState<Question | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestion = () => {
      try {
        if (!id) throw new Error('Question ID is required');
        const foundQuestion = getTicketById(id);
        if (foundQuestion) {
          setQuestion(foundQuestion);
        } else {
          setError('Question not found');
        }
      } catch (err) {
        setError('Error loading question');
      } finally {
        setLoading(false);
      }
    };

    loadQuestion();
  }, [id]);

  const handleBack = () => {
    navigate('/questions');
  };

  const handleStatusChange = (newStatus: QuestionStatus) => {
    if (!question) return;

    try {
      const updatedQuestion = updateTicket(question.id, {
        ...question,
        status: newStatus
      });
      setQuestion(updatedQuestion);
    } catch (err) {
      setError('Failed to update question status');
    }
  };

  const handleAssigneeChange = (assignee: string) => {
    if (!question) return;

    try {
      const updatedQuestion = updateTicket(question.id, {
        ...question,
        assignedTo: assignee,
        status: assignee ? 'assigned' : 'unassigned'
      });
      setQuestion(updatedQuestion);
    } catch (err) {
      setError('Failed to update question assignee');
    }
  };

  const handleCategoryChange = (category: string) => {
    if (!question) return;

    try {
      const updatedQuestion = updateTicket(question.id, {
        ...question,
        category
      });
      setQuestion(updatedQuestion);
    } catch (err) {
      setError('Failed to update question category');
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question || !newMessage.trim()) return;

    try {
      const updatedQuestion = updateTicket(question.id, {
        ...question,
        messages: [
          ...(question.messages || []),
          {
            id: (question.messages?.length || 0) + 1,
            author: 'System',
            content: newMessage.trim(),
            timestamp: new Date().toISOString()
          }
        ]
      });
      setQuestion(updatedQuestion);
      setNewMessage('');
    } catch (err) {
      setError('Failed to send message');
    }
  };

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  if (error || !question) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-red-600 mb-4">{error || 'Question not found'}</p>
        <button
          onClick={handleBack}
          className={theme.components.button.secondary + ' px-4 py-2'}
        >
          Return to Questions
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className="p-2 text-gray-500 hover:text-brand-purple rounded-lg hover:bg-brand-purple/5"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">Question #{question.id}</h1>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 space-y-6">
          {/* Question Details */}
          <div className={theme.components.card.base + ' p-6'}>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">{question.title}</h2>
            <p className="text-gray-600 mb-6">{question.question}</p>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span>Submitted: {new Date(question.submittedAt).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Tag className="w-4 h-4" />
                <span>Category: {question.category}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <User className="w-4 h-4" />
                <span>Assigned: {question.assignedTo || 'Unassigned'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-brand-orange" />
                <span className="text-brand-orange capitalize">{question.status}</span>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className={theme.components.card.base + ' p-6'}>
            <div className="flex items-center gap-2 mb-6">
              <MessageSquare className="w-5 h-5 text-brand-purple" />
              <h3 className="text-lg font-semibold text-gray-900">Messages</h3>
            </div>

            <div className="space-y-6">
              {question.messages?.map(message => (
                <div key={message.id} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-brand-purple to-brand-pink flex items-center justify-center">
                    <span className="text-white text-sm">{message.author[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-gray-900">{message.author}</span>
                      <span className="text-sm text-gray-500">
                        {new Date(message.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-gray-600">{message.content}</p>
                  </div>
                </div>
              ))}

              {(!question.messages || question.messages.length === 0) && (
                <p className="text-center text-gray-500">No messages yet</p>
              )}
            </div>

            {/* Reply Input */}
            <form onSubmit={handleSendMessage} className="mt-6">
              <textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className={theme.components.input.base + ' min-h-[100px]'}
              />
              <div className="mt-4 flex justify-end">
                <button 
                  type="submit"
                  className={theme.components.button.primary + ' px-6 py-2'}
                  disabled={!newMessage.trim()}
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Sidebar */}
        <div className={theme.components.card.base + ' p-6 h-fit'}>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Status
              </label>
              <select
                value={question.status}
                onChange={(e) => handleStatusChange(e.target.value as QuestionStatus)}
                className={theme.components.input.base}
              >
                <option value="unassigned">Unassigned</option>
                <option value="assigned">Assigned</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <Select
                value={question.category}
                onChange={(e) => handleCategoryChange(e.target.value)}
              >
                {CATEGORIES.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign To
              </label>
              <Select
                value={question.assignedTo || ''}
                onChange={(e) => handleAssigneeChange(e.target.value)}
              >
                <option value="">Select Expert</option>
                {experts.map(expert => (
                  <option key={expert.id} value={expert.name}>
                    {expert.name} - {expert.specialty}
                  </option>
                ))}
              </Select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}