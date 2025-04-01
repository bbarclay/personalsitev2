import React from 'react';

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  className?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  value,
  onChange,
  type = 'number',
  className = '',
}) => (
  <label className="block mb-4">
    <span className="text-sm font-medium text-foreground mb-1.5 block">
      {label}
    </span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`
        w-full
        px-3 py-2
        bg-background/50
        backdrop-blur-[1px]
        border border-foreground/10
        rounded-md
        text-foreground
        placeholder-foreground/50
        focus:outline-none
        focus:ring-2
        focus:ring-purple-500
        focus:border-transparent
        hover:border-foreground/20
        transition-colors
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      min="1"
      step="1"
    />
  </label>
);

export default InputField;
