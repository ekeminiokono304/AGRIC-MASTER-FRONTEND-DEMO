import React, { useState } from 'react';
import { usePredict } from '../hooks/usePredict';
import { Input, Select, Button } from '../components/Form';
import { LoadingState, ResultCard, ErrorState } from '../components/ResultViews';
import { CloudSun } from 'lucide-react';

export const DroughtRisk = () => {
  const { loading, result, error, submit, reset } = usePredict('drought');
  
  const [formData, setFormData] = useState({
    region: '',
    days_since_last_rain: '',
    soil_moisture_level: '',
    forecasted_temps: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit('/predict/drought', formData);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-agric-border">
        <div className="p-2 bg-agric-panel border border-agric-border-light text-agric-primary rounded-lg">
          <CloudSun size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-agric-text">Drought Risk Scoring</h1>
          <p className="text-sm text-agric-text-muted">Evaluate water scarcity risks for your region and soil.</p>
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={() => submit('/predict/drought', formData)} />
      ) : result ? (
        <ResultCard result={result} onRetry={reset} />
      ) : (
        <form onSubmit={handleSubmit} className="agric-card p-6 md:p-8 rounded-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              id="region" 
              label="Region / Location" 
              placeholder="e.g., Sahel, Eastern Cape" 
              required 
              value={formData.region}
              onChange={handleChange}
            />
            <Input 
              id="days_since_last_rain" 
              label="Days Since Last Rain" 
              type="number"
              placeholder="e.g., 45" 
              required 
              value={formData.days_since_last_rain}
              onChange={handleChange}
            />
            <Select 
              id="soil_moisture_level" 
              label="Current Soil Moisture" 
              required
              value={formData.soil_moisture_level}
              onChange={handleChange}
              options={[
                { value: 'severely_dry', label: 'Severely Dry / Cracking' },
                { value: 'dry', label: 'Dry' },
                { value: 'moderate', label: 'Moderate' },
                { value: 'moist', label: 'Moist' }
              ]}
            />
            <Input 
              id="forecasted_temps" 
              label="Forecasted Temps (next 7 days)" 
              placeholder="e.g., High 35°C, Low 22°C" 
              required 
              value={formData.forecasted_temps}
              onChange={handleChange}
            />
          </div>
          
          <div className="pt-4 border-t border-agric-border">
            <Button type="submit" className="w-full md:w-auto">
              Calculate Risk
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
