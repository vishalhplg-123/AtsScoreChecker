import React from 'react';
import { Sparkles } from 'lucide-react';

export const AIButton = ({
  onClick,
  label = 'AI Assistant',
  compact = false,
  className = '',
  loading = false,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 font-medium rounded-lg text-xs bg-gradient-to-r from-violet-600 via-indigo-600 to-cyan-500 text-white shadow-sm hover:shadow-glow hover:opacity-95 transition-all duration-200 cursor-pointer disabled:opacity-50 ${
        compact ? 'px-2 py-1' : 'px-3 py-1.5'
      } ${className}`}
      title={label}
    >
      <Sparkles className="w-3.5 h-3.5 animate-pulse shrink-0" />
      <span>{label}</span>
    </button>
  );
};
