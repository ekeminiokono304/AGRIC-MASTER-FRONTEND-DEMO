import React, { useState } from 'react';
import { usePredict } from '../hooks/usePredict';
import { Input, Textarea, Button } from '../components/Form';
import { LoadingState, ResultCard, ErrorState } from '../components/ResultViews';
import { Bug } from 'lucide-react';

export const DiseaseAssessment = () => {
  const { loading, result, error, submit, reset } = usePredict('disease');
  
  const [formData, setFormData] = useState({
    crop_type: '',
    symptoms: '',
    weather_conditions: '',
    affected_area_percentage: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit('/predict/disease', formData);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-agric-border">
        <div className="p-2 bg-agric-panel border border-agric-border-light text-agric-primary rounded-lg">
          <Bug size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-agric-text">Disease Assessment</h1>
          <p className="text-sm text-agric-text-muted">Describe the symptoms to identify potential plant diseases.</p>
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={() => submit('/predict/disease', formData)} />
      ) : result ? (
        <ResultCard result={result} onRetry={reset} />
      ) : (
        <form onSubmit={handleSubmit} className="agric-card p-6 md:p-8 rounded-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              id="crop_type" 
              label="Crop Type" 
              placeholder="e.g., Tomato, Bean" 
              required 
              value={formData.crop_type}
              onChange={handleChange}
            />
            <Input 
              id="affected_area_percentage" 
              label="Affected Area (%)" 
              type="number"
              min="0"
              max="100"
              placeholder="e.g., 15" 
              required 
              value={formData.affected_area_percentage}
              onChange={handleChange}
            />
          </div>
          <Input 
            id="weather_conditions" 
            label="Recent Weather Conditions" 
            placeholder="e.g., High humidity, unseasonal rain for past 3 days" 
            required 
            value={formData.weather_conditions}
            onChange={handleChange}
          />
          <Textarea 
            id="symptoms" 
            label="Observed Symptoms" 
            placeholder="e.g., Yellowing leaves with brown spots on the edges, wilting during mid-day..." 
            required 
            value={formData.symptoms}
            onChange={handleChange}
          />
          
          <div className="pt-4 border-t border-agric-border">
            <Button type="submit" className="w-full md:w-auto">
              Assess Disease
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
