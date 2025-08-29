"use client";

import { useState } from 'react';

interface InteractiveButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
  className?: string;
}

export default function InteractiveButton({ 
  href, 
  children, 
  variant = 'secondary',
  className = ''
}: InteractiveButtonProps) {
  const [isHovered, setIsHovered] = useState(false);

  const baseStyles = {
    padding: '12px 24px',
    borderRadius: '8px',
    fontSize: '16px',
    fontWeight: '600',
    textDecoration: 'none',
    display: 'inline-block',
    transition: 'all 0.2s ease',
    border: '1px solid #e5e7eb',
    cursor: 'pointer'
  };

  const variantStyles = {
    primary: {
      backgroundColor: isHovered ? '#2563eb' : '#3b82f6',
      color: 'white',
      borderColor: '#3b82f6'
    },
    secondary: {
      backgroundColor: isHovered ? '#e5e7eb' : '#f3f4f6',
      color: '#374151',
      borderColor: '#e5e7eb'
    }
  };

  const currentStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
    boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.15)' : 'none'
  };

  return (
    <a
      href={href}
      style={currentStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={className}
    >
      {children}
    </a>
  );
}
