import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sprout, Bug, TrendingUp, PawPrint, CloudSun, ArrowRight } from 'lucide-react';
import { Button } from '../components/Form';

const modules = [
  { path: '/yield', title: 'Crop Yield Estimation', description: 'Estimate potential harvest yields based on crop type, soil, and region.', icon: Sprout },
  { path: '/disease', title: 'Disease Assessment', description: 'Identify potential plant diseases from symptoms and weather conditions.', icon: Bug },
  { path: '/price', title: 'Market Price Forecast', description: 'Gauge expected commodity prices based on region and quality.', icon: TrendingUp },
  { path: '/livestock', title: 'Livestock Anomaly', description: 'Flag potential health issues based on behavioral or feed changes.', icon: PawPrint },
  { path: '/drought', title: 'Drought Risk', description: 'Evaluate water scarcity risks for your region and soil.', icon: CloudSun },
];

export const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="agric-card text-agric-text rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none text-agric-accent">
          <Sprout size={200} />
        </div>
        <div className="relative z-10 max-w-2xl">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-agric-text">
            AI Field Assistant
          </h1>
          <p className="text-lg md:text-xl text-agric-text-muted mb-6 leading-relaxed">
            Welcome to AGRIC-MASTER. We use advanced AI to analyze your field data and provide actionable, structured insights. Every recommendation includes the model's transparent reasoning to help you make informed decisions.
          </p>
          <div className="inline-flex items-center gap-2 bg-agric-panel rounded-lg px-4 py-2 text-sm font-medium text-agric-accent border border-agric-border-light llama-badge">
            <span className="w-2 h-2 rounded-full bg-agric-accent animate-pulse relative z-10 shadow-[0_0_8px_var(--glow-lime)]"></span>
            <span className="relative z-10 tracking-wide">Powered by LLaMA 3 70B</span>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-agric-text mb-6">Select a Module</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {modules.map((mod) => (
            <div 
              key={mod.path}
              onClick={() => navigate(mod.path)}
              className="group cursor-pointer agric-card rounded-xl p-6 transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-agric-panel text-agric-primary flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-agric-border-dim">
                <mod.icon size={24} />
              </div>
              <h3 className="text-lg font-semibold text-agric-text mb-2 group-hover:text-agric-accent transition-colors">{mod.title}</h3>
              <p className="text-sm text-agric-text-muted mb-4 line-clamp-2">{mod.description}</p>
              <div className="flex items-center text-sm font-medium text-agric-primary group-hover:text-agric-accent">
                Start Assessment <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
