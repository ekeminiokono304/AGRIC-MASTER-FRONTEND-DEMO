import { useState } from 'react';
import { predict, handleApiError } from '../api/client';
import { PredictionResponse } from '../types';
import { useHistory } from '../components/HistoryContext';

export function usePredict(module: 'yield' | 'disease' | 'price' | 'livestock' | 'drought') {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<PredictionResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { addHistoryItem } = useHistory();

  const submit = async (endpoint: string, payload: Record<string, any>) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await predict(endpoint, payload);
      setResult(res);
      addHistoryItem({ module, inputs: payload, result: res });
    } catch (err) {
      setError(handleApiError(err));
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setResult(null);
    setError(null);
  };

  return { loading, result, error, submit, reset };
}
