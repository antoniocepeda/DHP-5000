import { useState, useEffect } from 'react';
import { questionService } from '../services/QuestionService';
import type { Question } from '../types';

export function useQuestions(filters: { status?: string; assignee?: string } = {}) {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = questionService.onQuestionsChanged(filters, (updatedQuestions) => {
      setQuestions(updatedQuestions);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [filters.status, filters.assignee]);

  return { questions, loading, error };
}

export function useQuestion(id: string) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = questionService.onQuestionUpdated(id, (updatedQuestion) => {
      setQuestion(updatedQuestion);
      setLoading(false);
    });

    return () => {
      unsubscribe();
    };
  }, [id]);

  return { question, loading, error };
} 