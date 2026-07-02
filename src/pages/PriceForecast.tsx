import React, { useState } from 'react';
import { usePredict } from '../hooks/usePredict';
import { Input, Select, Button } from '../components/Form';
import { LoadingState, ResultCard, ErrorState } from '../components/ResultViews';
import { TrendingUp } from 'lucide-react';

export const PriceForecast = () => {
  const { loading, result, error, submit, reset } = usePredict('price');
  
  const [formData, setFormData] = useState({
    commodity: '',
    market_region: '',
    current_season: '',
    quality_grade: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit('/predict/price', formData);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-agric-border">
        <div className="p-2 bg-agric-panel border border-agric-border-light text-agric-primary rounded-lg">
          <TrendingUp size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-agric-text">Market Price Forecast</h1>
          <p className="text-sm text-agric-text-muted">Gauge expected commodity prices based on region and quality.</p>
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={() => submit('/predict/price', formData)} />
      ) : result ? (
        <ResultCard result={result} onRetry={reset} />
      ) : (
        <form onSubmit={handleSubmit} className="agric-card p-6 md:p-8 rounded-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              id="commodity" 
              label="Commodity" 
              placeholder="e.g., White Maize, Coffee Beans" 
              required 
              value={formData.commodity}
              onChange={handleChange}
            />
            <Input 
              id="market_region" 
              label="Market Region" 
              placeholder="e.g., Nairobi, Mbare Musika" 
              required 
              value={formData.market_region}
              onChange={handleChange}
            />
            <Select 
              id="current_season" 
              label="Current Season" 
              required
              value={formData.current_season}
              onChange={handleChange}
              options={[
                { value: 'planting', label: 'Planting Season' },
                { value: 'growing', label: 'Growing Season' },
                { value: 'harvest', label: 'Harvest Season' },
                { value: 'off-season', label: 'Off-Season' }
              ]}
            />
            <Select 
              id="quality_grade" 
              label="Quality Grade" 
              required
              value={formData.quality_grade}
              onChange={handleChange}
              options={[
                { value: 'grade_1', label: 'Grade 1 / Premium' },
                { value: 'grade_2', label: 'Grade 2 / Standard' },
                { value: 'grade_3', label: 'Grade 3 / Low' },
                { value: 'mixed', label: 'Mixed Quality' }
              ]}
            />
          </div>
          
          <div className="pt-4 border-t border-agric-border">
            <Button type="submit" className="w-full md:w-auto">
              Forecast Price
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
