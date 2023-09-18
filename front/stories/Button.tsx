import Head from 'next/head';
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  danger?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How lg should the button be?
   */
  size?: 'sm' | 'md' | 'lg';
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}

/**
 * Danger UI component for user interaction
 */
export const Button = ({
  danger = false,
  size = 'md',
  backgroundColor,
  label,
  ...props
}: ButtonProps) => {
  const mode = danger ? 'btn btn-outline-danger' : 'btn btn-outline-secondary';
  return (
    <>
    <button
      type="button"
      className={['btn', `btn-${size}`, mode].join(' ')}
      {...props}
    >
      {label}
      <style jsx>{`
        button {
          background-color: ${backgroundColor};
        }
      `}</style>
    </button>
    </>
  );
};
