import { useState, useEffect } from 'react';
import { expertService } from '../services/ExpertService';
import type { Expert } from '../types';

export function useExperts(filters: { specialty?: string } = {}) {
  const [experts, setExperts] = useState<Expert[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
      const unsubscribe = expertService.onExpertsChanged(filters, (updatedExperts) => {
        setExperts(updatedExperts);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (err) {
      setError(err as Error);
      setLoading(false);
    }
  }, [filters.specialty]);

  return { experts, loading, error };
} 