import React, { useState } from 'react';
import { theme } from '../../styles/theme';
import { Search, Plus, Mail, Phone, Award, X } from 'lucide-react';
import { experts, addExpert } from '../../data/experts';
import type { Expert } from '../../types';
import { Input } from '../common/Input';

export default function ExpertsPage() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [newExpert, setNewExpert] = useState<Partial<Expert>>({
    name: '',
    specialty: '',
    email: '',
    phone: '',
    status: 'Active',
    cases: 0
  });

  const handleViewProfile = (expertId: string) => {
    window.history.pushState({}, '', `/experts/${expertId}`);
    window.dispatchEvent(new PopStateEvent('popstate'));
  };

  const handleAddExpert = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpert.name || !newExpert.specialty || !newExpert.email || !newExpert.phone) {
      return;
    }

    const expertId = `E${(experts.length + 1).toString().padStart(3, '0')}`;
    const expert: Expert = {
      id: expertId,
      name: newExpert.name,
      specialty: newExpert.specialty,
      email: newExpert.email,
      phone: newExpert.phone,
      status: 'Active',
      cases: 0
    };

    addExpert(expert);
    setShowAddForm(false);
    setNewExpert({
      name: '',
      specialty: '',
      email: '',
      phone: '',
      status: 'Active',
      cases: 0
    });
  };

  const filteredExperts = experts.filter(expert =>
    expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    expert.specialty.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Medical Experts</h1>
        <div className="flex items-center gap-4">
          <div className="relative">
            <Input
              icon={<Search className="w-5 h-5" />}
              type="text"
              placeholder="Search experts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="py-2"
            />
          </div>
          <button 
            onClick={() => setShowAddForm(true)}
            className={theme.components.button.primary + ' px-4 py-2 inline-flex items-center gap-2'}
          >
            <Plus className="w-4 h-4" />
            Add Expert
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperts.map((expert) => (
          <div key={expert.id} className={theme.components.card.base + ' p-6'}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900">{expert.name}</h3>
                <p className="text-sm text-gray-500">{expert.specialty}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-purple/10 text-brand-purple">
                {expert.status}
              </span>
            </div>
            
            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Mail className="w-4 h-4" />
                {expert.email}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Phone className="w-4 h-4" />
                {expert.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Award className="w-4 h-4" />
                {expert.cases} cases completed
              </div>
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => handleViewProfile(expert.id)}
                className={theme.components.button.secondary + ' px-4 py-2 text-sm flex-1'}
              >
                View Profile
              </button>
              <button 
                onClick={() => handleViewProfile(expert.id)}
                className={theme.components.button.primary + ' px-4 py-2 text-sm flex-1'}
              >
                Assign Case
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Expert Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className={`${theme.components.card.base} w-full max-w-lg p-6`}>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">Add New Expert</h2>
              <button 
                onClick={() => setShowAddForm(false)}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddExpert} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <Input
                  type="text"
                  value={newExpert.name}
                  onChange={(e) => setNewExpert({ ...newExpert, name: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Specialty
                </label>
                <Input
                  type="text"
                  value={newExpert.specialty}
                  onChange={(e) => setNewExpert({ ...newExpert, specialty: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  value={newExpert.email}
                  onChange={(e) => setNewExpert({ ...newExpert, email: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone
                </label>
                <Input
                  type="tel"
                  value={newExpert.phone}
                  onChange={(e) => setNewExpert({ ...newExpert, phone: e.target.value })}
                  required
                />
              </div>

              <div className="flex justify-end gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className={theme.components.button.secondary + ' px-4 py-2'}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={theme.components.button.primary + ' px-4 py-2'}
                >
                  Add Expert
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}