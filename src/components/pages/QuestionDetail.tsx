import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuestion } from '../../hooks/useQuestions';
import LoadingSpinner from '../common/LoadingSpinner';
import { questionService } from '../../services/QuestionService';
import type { QuestionStatus } from '../../types';

function formatTimestamp(timestamp: any): string {
  if (!timestamp) return '';
  if (timestamp.seconds) {
    return new Date(timestamp.seconds * 1000).toLocaleString();
  }
  return timestamp;
}

export default function QuestionDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { question, loading, error } = useQuestion(id || '');
  const [newMessage, setNewMessage] = useState('');

  const handleBack = () => {
    navigate('/questions');
  };

  const handleStatusChange = async (newStatus: QuestionStatus) => {
    if (!question) return;
    try {
      await questionService.updateQuestion(question.id, {
        ...question,
        status: newStatus
      });
    } catch (err) {
      console.error('Failed to update question status:', err);
    }
  };

  const handleAssigneeChange = async (assignee: string) => {
    if (!question) return;
    try {
      await questionService.updateQuestion(question.id, {
        ...question,
        assignedTo: assignee,
        status: assignee ? 'assigned' : 'unassigned'
      });
    } catch (err) {
      console.error('Failed to update question assignee:', err);
    }
  };

  const handleSendMessage = async () => {
    if (!question || !newMessage.trim()) return;
    try {
      // Add message handling here once MessageService is implemented
      setNewMessage('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  if (loading) return <LoadingSpinner />;
  
  if (error) {
    return (
      <div className="text-red-500 p-4">
        Error loading question: {error.message}
      </div>
    );
  }

  if (!question) {
    return (
      <div className="text-gray-500 p-4">
        Question not found
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
          ← Back
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{question.title}</h1>
          <p className="text-gray-500">Case #{question.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Question Content */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-medium text-gray-900 mb-4">Question Details</h2>
            <p className="text-gray-700">{question.question}</p>
            <div className="mt-4 flex gap-2">
              <span className="text-sm text-brand-purple">{question.category}</span>
              <span className="text-sm text-gray-500">•</span>
              <span className="text-sm text-gray-500">{question.status}</span>
            </div>
          </div>

          {/* Messages Section */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-medium text-gray-900 mb-4">Messages</h2>
            <div className="space-y-4">
              {question.messages?.map((message) => (
                <div key={message.id} className="flex gap-4">
                  <div className="flex-1 bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <span className="font-medium text-gray-900">{message.author}</span>
                      <span className="text-sm text-gray-500">{message.timestamp}</span>
                    </div>
                    <p className="text-gray-700 mt-2">{message.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2"
              />
              <button
                onClick={handleSendMessage}
                className="px-4 py-2 bg-brand-purple text-white rounded-lg hover:bg-brand-purple/90"
              >
                Send
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-medium text-gray-900 mb-4">Status</h2>
            <select
              value={question.status}
              onChange={(e) => handleStatusChange(e.target.value as QuestionStatus)}
              className="w-full border rounded-lg px-4 py-2"
            >
              <option value="unassigned">Unassigned</option>
              <option value="assigned">Assigned</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-medium text-gray-900 mb-4">Assigned Expert</h2>
            <input
              type="text"
              value={question.assignedTo || ''}
              onChange={(e) => handleAssigneeChange(e.target.value)}
              placeholder="Assign to expert..."
              className="w-full border rounded-lg px-4 py-2"
            />
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="font-medium text-gray-900 mb-4">Details</h2>
            <div className="space-y-2">
              <div>
                <span className="text-sm text-gray-500">Submitted</span>
                <p className="text-gray-900">{formatTimestamp(question.submittedAt)}</p>
              </div>
              {question.updatedAt && (
                <div>
                  <span className="text-sm text-gray-500">Last Updated</span>
                  <p className="text-gray-900">{formatTimestamp(question.updatedAt)}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-gray-500">Priority</span>
                <p className="text-gray-900">{question.priority}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 