import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { expertService } from '../../services/ExpertService';
import type { Expert } from '../../types';
import LoadingSpinner from '../common/LoadingSpinner';

export default function ExpertProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState<Expert | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const loadExpert = async () => {
      if (!id) return;
      try {
        const result = await expertService.getById(id);
        setExpert(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    loadExpert();
  }, [id]);

  const handleBack = () => {
    navigate('/experts');
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div>Error loading expert: {error.message}</div>;
  if (!expert) return <div>Expert not found</div>;

  return (
    <div className="space-y-6">
      {/* Back Button */}
      <button
        onClick={handleBack}
        className="flex items-center text-gray-600 hover:text-gray-900"
      >
        <span className="mr-2">←</span> Back to Experts
      </button>

      {/* Expert Profile Card */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">{expert.name}</h1>
              <p className="text-brand-purple mt-1">{expert.specialty}</p>
            </div>
            <span className={`inline-block px-3 py-1 rounded-full text-sm ${
              expert.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {expert.status}
            </span>
          </div>

          {/* Contact Information */}
          <div className="mt-6 space-y-4">
            <div>
              <h2 className="text-sm font-medium text-gray-500">Contact Information</h2>
              <div className="mt-2 space-y-2">
                <p className="text-gray-900">
                  <span className="font-medium">Email:</span> {expert.email}
                </p>
                <p className="text-gray-900">
                  <span className="font-medium">Phone:</span> {expert.phone}
                </p>
              </div>
            </div>

            {/* Statistics */}
            <div>
              <h2 className="text-sm font-medium text-gray-500">Statistics</h2>
              <div className="mt-2">
                <p className="text-gray-900">
                  <span className="font-medium">Total Cases:</span> {expert.cases}
                </p>
              </div>
            </div>
          </div>

          {/* Recent Activity or Additional Information can be added here */}
        </div>
      </div>
    </div>
  );
}