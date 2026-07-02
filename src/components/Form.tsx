import React from 'react';
import { cn } from '../utils/cn';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5">
        <label htmlFor={id} className="text-[12px] uppercase tracking-[0.05em] text-agric-text-dim">
          {label}
        </label>
        <input
          id={id}
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-md border border-agric-border bg-agric-input px-3 py-2 text-sm text-agric-text shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-agric-text-dim focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-agric-accent disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, id, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5">
        <label htmlFor={id} className="text-[12px] uppercase tracking-[0.05em] text-agric-text-dim">
          {label}
        </label>
        <textarea
          id={id}
          ref={ref}
          className={cn(
            "flex min-h-[100px] w-full rounded-md border border-agric-border bg-agric-input px-3 py-2 text-sm text-agric-text shadow-sm transition-colors placeholder:text-agric-text-dim focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-agric-accent disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', ...props }, ref) => {
    const variants = {
      primary: 'bg-agric-primary text-white hover:bg-agric-primary-hover shadow-sm',
      secondary: 'bg-agric-panel border border-agric-border text-agric-text hover:bg-agric-border-light',
      outline: 'border border-agric-border bg-transparent text-agric-text hover:bg-agric-border-dim',
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex h-12 items-center justify-center rounded-md px-6 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-agric-accent focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, id, options, ...props }, ref) => {
    return (
      <div className="flex flex-col space-y-1.5">
        <label htmlFor={id} className="text-[12px] uppercase tracking-[0.05em] text-agric-text-dim">
          {label}
        </label>
        <select
          id={id}
          ref={ref}
          className={cn(
            "flex h-12 w-full rounded-md border border-agric-border bg-agric-input px-3 py-2 text-sm text-agric-text shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-agric-accent disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        >
          <option value="" disabled>Select an option...</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
);
Select.displayName = 'Select';
