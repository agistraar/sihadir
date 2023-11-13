'use client';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface InputSelectProps {
  id: string;
  formId: string;
  label?: string;
  register: UseFormRegister<FieldValues>;
  options: { value: string; label: string }[];
  handleChange?: (e: any) => void;
}

const InputSelect: React.FC<InputSelectProps> = ({
  id,
  register,
  label,
  formId,
  options,
  handleChange,
}) => {
  return (
    <div className='space-y-1'>
      <label htmlFor={id} className='text-sm font-bold text-gray-500'>
        {label}
      </label>
      <select
        id={id}
        form={formId}
        autoComplete={id}
        {...register(id)}
        onChange={handleChange}
        className=' border border-gray-300 text-black text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2'
      >
        {options.map((res) => (
          <option key={res.value} value={res.value}>
            {res.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputSelect;
