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
  white?: boolean;
  red?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  disabled,
  large,
  white,
  red,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx(
        `flex justify-center rounded-xl px-3 md:px-5 font-semibold hover:-translate-y-[1px] transition-transform duration-200`,
        disabled && `opacity-50 cursor-default`,
        fullWidth && `w-full`,
        secondary && 'text-white bg-gray-500',
        !secondary && !white && !red && 'custom-gradient text-white',
        large ? `py-3 md:py-3.5 text-xs md:text-md` : `py-1.5 md:py-2 text-xs`,
        white && 'bg-white border ',
        red && 'bg-red-500 text-white'
      )}
    >
      {children}
    </button>
  );
};

export default Button;
