
import React from 'react';

type InputProps = {
  id?: string;
  label: string;
  as?: 'input' | 'select';
} & (
  | React.InputHTMLAttributes<HTMLInputElement>
  | React.SelectHTMLAttributes<HTMLSelectElement>
);

const Input: React.FC<InputProps> = ({ id, label, as = 'input', ...props }) => {
  const inputId = id || props.name;
  const baseClasses = "mt-1 block w-full px-3 py-2 bg-slate-800 border border-slate-600 rounded-md text-white shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm";

  return (
    <div>
      <label htmlFor={inputId} className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      {as === 'select' ? (
        <select id={inputId} {...(props as React.SelectHTMLAttributes<HTMLSelectElement>)} className={baseClasses + ' ' + props.className}>
          {props.children}
        </select>
      ) : (
        <input id={inputId} {...(props as React.InputHTMLAttributes<HTMLInputElement>)} className={baseClasses + ' ' + props.className} />
      )}
    </div>
  );
};

export default Input;
