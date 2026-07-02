import React, { useState } from 'react';
import { usePredict } from '../hooks/usePredict';
import { Input, Select, Button } from '../components/Form';
import { LoadingState, ResultCard, ErrorState } from '../components/ResultViews';
import { Sprout } from 'lucide-react';

export const YieldPredictor = () => {
  const { loading, result, error, submit, reset } = usePredict('yield');
  
  const [formData, setFormData] = useState({
    crop_type: '',
    region: '',
    soil_type: '',
    recent_rainfall: '',
    fertilizer_used: '',
    farm_size: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submit('/predict/yield', formData);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="flex items-center gap-3 mb-8 pb-4 border-b border-agric-border">
        <div className="p-2 bg-agric-panel border border-agric-border-light text-agric-primary rounded-lg">
          <Sprout size={24} />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-agric-text">Crop Yield Estimation</h1>
          <p className="text-sm text-agric-text-muted">Tell us about your field to estimate potential harvest yields.</p>
        </div>
      </div>

      {loading ? (
        <LoadingState />
      ) : error ? (
        <ErrorState message={error} onRetry={() => submit('/predict/yield', formData)} />
      ) : result ? (
        <ResultCard result={result} onRetry={reset} />
      ) : (
        <form onSubmit={handleSubmit} className="agric-card p-6 md:p-8 rounded-xl space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input 
              id="crop_type" 
              label="Crop Type" 
              placeholder="e.g., Maize, Sorghum, Cassava" 
              required 
              value={formData.crop_type}
              onChange={handleChange}
            />
            <Input 
              id="region" 
              label="Region / Location" 
              placeholder="e.g., Rift Valley, Kano Plains" 
              required 
              value={formData.region}
              onChange={handleChange}
            />
            <Select 
              id="soil_type" 
              label="Soil Type" 
              required
              value={formData.soil_type}
              onChange={handleChange}
              options={[
                { value: 'clay', label: 'Clay' },
                { value: 'sandy', label: 'Sandy' },
                { value: 'loamy', label: 'Loamy' },
                { value: 'silt', label: 'Silt' },
                { value: 'unknown', label: 'Not Sure' }
              ]}
            />
            <Input 
              id="farm_size" 
              label="Farm Size (Acres)" 
              type="number"
              step="0.1"
              placeholder="e.g., 2.5" 
              required 
              value={formData.farm_size}
              onChange={handleChange}
            />
            <Input 
              id="recent_rainfall" 
              label="Recent Rainfall (mm)" 
              type="number"
              placeholder="e.g., 120" 
              value={formData.recent_rainfall}
              onChange={handleChange}
            />
            <Input 
              id="fertilizer_used" 
              label="Fertilizer Used" 
              placeholder="e.g., NPK 15:15:15, Organic Compost" 
              value={formData.fertilizer_used}
              onChange={handleChange}
            />
          </div>
          <div className="pt-4 border-t border-agric-border">
            <Button type="submit" className="w-full md:w-auto">
              Estimate Yield
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};
