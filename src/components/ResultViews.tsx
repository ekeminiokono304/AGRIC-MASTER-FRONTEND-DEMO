import React from 'react';
import { Loader2 } from 'lucide-react';
import { PredictionResponse } from '../types';

export const LoadingState = () => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4 rounded-xl agric-card">
      <Loader2 className="h-10 w-10 text-agric-accent animate-spin" />
      <div>
        <h3 className="text-lg font-medium text-agric-text">AI is reasoning...</h3>
        <p className="text-sm text-agric-text-muted mt-1">Analyzing your inputs to generate structured insights. This usually takes 2-5 seconds.</p>
      </div>
    </div>
  );
};

export const ResultCard = ({ result, onRetry }: { result: PredictionResponse | null, onRetry?: () => void }) => {
  if (!result) return null;

  return (
    <div className="rounded-xl agric-card overflow-hidden flex flex-col">
      <div className="p-6 pb-5">
        <div className="inline-block px-3 py-1 rounded-full text-[12px] font-bold uppercase bg-agric-border text-agric-accent mb-3">
          AI Verdict
        </div>
        <h3 className="text-[28px] mb-2 font-semibold text-agric-text leading-tight">
          {result.prediction}
        </h3>
        <p className="text-sm text-agric-text-muted">Projected outcome based on current inputs.</p>
      </div>
      
      <div className="flex-1 bg-agric-bg rounded-lg p-5 border border-agric-border mx-6 mb-6">
        <h4 className="text-[12px] uppercase text-agric-primary font-bold m-0 mb-3 tracking-wide">The Reasoning</h4>
        <div className="border-l-[3px] border-agric-accent pl-5">
          <div className="m-0 text-[15px] leading-[1.6] text-slate-300 space-y-4">
            {result.reasoning.split('\n').map((paragraph, idx) => (
              <p key={idx}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>
      </div>
      
      <div className="px-6 pb-6 space-y-4">
        <div className="bg-agric-panel p-3 rounded-md text-[12px] border border-dashed border-agric-border text-agric-text-dim">
          <strong className="text-agric-text-muted">Disclaimer:</strong> This is an AI-generated estimate based on provided inputs, not a laboratory measurement or certified assessment. Please use as advisory guidance only.
        </div>

        {onRetry && (
          <div className="pt-2">
            <button 
              onClick={onRetry}
              className="text-sm font-medium text-agric-primary hover:text-agric-accent transition-colors"
            >
              Analyze another scenario
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const ErrorState = ({ message, onRetry }: { message: string, onRetry: () => void }) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center space-y-4 rounded-xl border border-red-900/50 bg-red-950/20">
      <div className="text-red-500">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>
      </div>
      <div>
        <h3 className="text-lg font-medium text-red-400">Something went wrong</h3>
        <p className="text-sm text-red-300 mt-1 max-w-md">{message}</p>
      </div>
      <button 
        onClick={onRetry}
        className="px-4 py-2 bg-red-900/50 hover:bg-red-900/80 border border-red-800/50 text-red-200 rounded-md text-sm font-medium transition-colors"
      >
        Try again
      </button>
    </div>
  );
};
