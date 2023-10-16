import React from 'react';

import clsx from 'clsx';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset' | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  disabled?: boolean;
  large?: boolean;
  detail?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  disabled,
  large,
  detail,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-xl px-2 sm:px-4 font-semibold hover:-translate-y-[1px] transition-transform duration-200`,
        disabled && `opacity-50 cursor-default`,
        fullWidth && `w-full`,
        secondary && 'text-white bg-gray-500',
        !secondary && !detail && 'custom-gradient text-white',
        large ? `py-3 sm:py-3.5 text-xs sm:text-sm` : `py-2 sm:py-3 text-xs`,
        detail && 'bg-white'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
