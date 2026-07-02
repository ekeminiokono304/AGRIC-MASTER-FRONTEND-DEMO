import React, { useState } from 'react';
import { usePredict } from '../hooks/usePredict';
import { Input, Textarea, Button } from '../components/Form';
import { LoadingState, ResultCard, ErrorState } from '../components/ResultViews';
import { PawPrint } from 'lucide-react';

export const LivestockAnomaly = () => {
  const { loading, result, error, submit, reset } = usePredict('livestock');
  
  const [formData, setFormData] = useState({
    animal_type: '',
    temperature: '',
    recent_feed_water_changes: '',
    observed_behavior: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit('/predict/livestock', formData);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-agric-border">
        <div className="p-2 bg-agric-panel border border-agric-border-light text-agric-primary rounded-lg">
          <PawPrint size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-agric-text">Livestock Anomaly Detection</h1>
          <p className="text-sm text-agric-text-muted">Flag potential health issues based on behavioral or feed changes.</p>
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={() => submit('/predict/livestock', formData)} />
      ) : result ? (
        <ResultCard result={result} onRetry={reset} />
      ) : (
        <form onSubmit={handleSubmit} className="agric-card p-6 md:p-8 rounded-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              id="animal_type" 
              label="Animal Type" 
              placeholder="e.g., Dairy Cow, Poultry, Goat" 
              required 
              value={formData.animal_type}
              onChange={handleChange}
            />
            <Input 
              id="temperature" 
              label="Temperature / Vitals (Optional)" 
              placeholder="e.g., 39.5°C" 
              value={formData.temperature}
              onChange={handleChange}
            />
          </div>
          <Input 
            id="recent_feed_water_changes" 
            label="Recent Feed/Water Changes" 
            placeholder="e.g., Switched to new silage batch, water intake down 30%" 
            required 
            value={formData.recent_feed_water_changes}
            onChange={handleChange}
          />
          <Textarea 
            id="observed_behavior" 
            label="Observed Behavior" 
            placeholder="e.g., Lethargic, isolating from herd, coughing occasionally..." 
            required 
            value={formData.observed_behavior}
            onChange={handleChange}
          />
          
          <div className="pt-4 border-t border-agric-border">
            <Button type="submit" className="w-full md:w-auto">
              Analyze Anomaly
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
