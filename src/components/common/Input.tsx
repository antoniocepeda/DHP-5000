import React from 'react';
import { theme } from '../../styles/theme';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  className?: string;
}

export const Input = ({ 
  icon, 
  className = '', 
  ...props 
}: InputProps) => {
  return (
    <div className="relative">
      <input
        {...props}
        className={`${theme.components.input.base} ${icon ? 'pl-10' : ''} ${className}`}
      />
      {icon && (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      )}
    </div>
  );
} 