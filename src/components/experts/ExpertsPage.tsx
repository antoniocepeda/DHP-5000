import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExperts } from '../../hooks/useExperts';
import LoadingSpinner from '../common/LoadingSpinner';
import { expertService } from '../../services/ExpertService';

export default function ExpertsPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [specialtyFilter, setSpecialtyFilter] = useState('all');
  
  const { experts, loading, error } = useExperts();

  const filteredExperts = experts.filter((expert) => {
    const matchesSearch = 
      expert.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      expert.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesSpecialty = specialtyFilter === 'all' || expert.specialty === specialtyFilter;

    return matchesSearch && matchesSpecialty;
  });

  const specialties = Array.from(new Set(experts.map(e => e.specialty)));

  return (
    <div className="space-y-6">
      {/* Test Button - Remove after confirming it works */}
      <button 
        onClick={async () => {
          console.log('Testing Firestore experts connection...');
          try {
            const result = await expertService.getAll();
            console.log('Firestore experts response:', result);
          } catch (error) {
            console.error('Firestore experts error:', error);
          }
        }}
        className="bg-brand-purple text-white px-4 py-2 rounded"
      >
        Test Experts Firestore
      </button>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <h1 className="text-2xl font-bold text-gray-900">Experts Directory</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search experts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-4 py-2"
          />
          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="border rounded-lg px-4 py-2"
          >
            <option value="all">All Specialties</option>
            {specialties.map(specialty => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Experts List */}
      {loading ? (
        <LoadingSpinner />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExperts.map(expert => (
            <div
              key={expert.id}
              onClick={() => navigate(`/experts/${expert.id}`)}
              className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
            >
              <h3 className="font-medium text-gray-900">{expert.name}</h3>
              <p className="text-brand-purple">{expert.specialty}</p>
              <div className="mt-2 text-sm text-gray-500">
                <p>{expert.email}</p>
                <p>Cases: {expert.cases}</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                  expert.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {expert.status}
                </span>
              </div>
            </div>
          ))}
          
          {filteredExperts.length === 0 && (
            <div className="col-span-full text-center text-gray-500 py-8">
              No experts found
            </div>
          )}
        </div>
      )}
    </div>
  );
}