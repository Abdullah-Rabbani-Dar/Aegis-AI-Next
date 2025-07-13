import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';
import Link from 'next/link';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  icon?: LucideIcon;
  onClick?: () => void;
  href?: string;
  bookingType?: 'demo' | 'call' | 'sales';
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  onClick,
  href,
  bookingType,
  className = '',
  disabled = false
}: ButtonProps) {
  const baseClasses = 'font-semibold rounded-lg transition-all transform hover:scale-105 flex items-center justify-center space-x-2';
  
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg hover:shadow-xl',
    secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200',
    outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50 backdrop-blur-sm bg-white/50'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4'
  };
  
  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;
  
  // Handle booking buttons
  if (bookingType) {
    return (
      <Link href={`/booking?type=${bookingType}`} className={classes}>
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
      </Link>
    );
  }

  // Handle regular links
  if (href) {
    return (
      <Link href={href} className={classes}>
        {Icon && <Icon className="w-5 h-5" />}
        <span>{children}</span>
      </Link>
    );
  }

  // Handle regular buttons
  return (
    <button
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {Icon && <Icon className="w-5 h-5" />}
      <span>{children}</span>
    </button>
  );
}