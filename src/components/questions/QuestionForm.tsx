import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { theme } from '../../styles/theme';
import { questionService } from '../../services/QuestionService';
import type { Ticket } from '../../types';
import { Input } from '../common/Input';

export default function QuestionForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'Chemistry',
    question: '',
    title: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create new ticket
    const newTicket: Ticket = {
      id: (parseInt(tickets[tickets.length - 1].id) + 1).toString().padStart(3, '0'),
      title: formData.title,
      question: formData.question,
      category: formData.category,
      status: 'unassigned',
      priority: 'medium',
      submittedAt: new Date().toISOString(),
      messages: []
    };

    // Add to tickets array
    tickets.push(newTicket);

    // Show success message
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        category: 'Chemistry',
        question: '',
        title: ''
      });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-brand-purple/10 via-brand-orange/10 via-brand-beige/10 to-brand-pink/10 flex items-center justify-center p-4">
      <div className={theme.components.card.base + ' w-full max-w-2xl p-8'}>
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Ask Our Diverse Healthcare Pros
        </h1>
        
        {submitted ? (
          <div className="text-center py-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-2">
              Question Submitted Successfully!
            </h2>
            <p className="text-gray-600">
              Our medical experts will review your question soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name
                </label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="John Doe"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="john@example.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Medical Category
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className={theme.components.input.base}
                required
              >
                <option value="Chemistry">Chemistry</option>
                <option value="Immunology">Immunology</option>
                <option value="Immunohematology">Immunohematology</option>
                <option value="Hematology">Hematology</option>
                <option value="Hemostasis">Hemostasis</option>
                <option value="Microbiology">Microbiology</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Question Title
              </label>
              <Input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="Brief title for your question"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Question
              </label>
              <textarea
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                className={theme.components.input.base}
                rows={5}
                placeholder="Please describe your medical question in detail..."
                required
              />
            </div>

            <div className="flex items-center justify-between">
              <a
                href="/"
                className="text-brand-purple hover:text-brand-pink text-sm font-medium"
              >
                ← Back to Home
              </a>
              <button
                type="submit"
                className={`${theme.components.button.primary} px-6 py-3 inline-flex items-center space-x-2`}
              >
                <Send className="w-5 h-5" />
                <span>Submit Question</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}