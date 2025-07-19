import React, { useEffect } from 'react';
import { CheckCircle, Loader, X, AlertCircle } from 'lucide-react';

interface SnackbarProps {
  isVisible: boolean;
  type: 'loading' | 'success' | 'error';
  message: string;
  onClose?: () => void;
  autoHide?: boolean;
  duration?: number;
}

export default function Snackbar({
  isVisible,
  type,
  message,
  onClose,
  autoHide = true,
  duration = 4000
}: SnackbarProps) {
  useEffect(() => {
    if (isVisible && autoHide && type !== 'loading') {
      const timer = setTimeout(() => {
        onClose?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, autoHide, duration, type, onClose]);

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'loading':
        return <Loader className="w-5 h-5 animate-spin text-blue-200" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-200" />;
      case 'error':
        return <AlertCircle className="w-5 h-5 text-red-200" />;
      default:
        return null;
    }
  };

  const getStyles = () => {
    switch (type) {
      case 'loading':
        return 'bg-blue-600 text-white border-blue-700 shadow-blue-500/20';
      case 'success':
        return 'bg-green-600 text-white border-green-700 shadow-green-500/20';
      case 'error':
        return 'bg-red-600 text-white border-red-700 shadow-red-500/20';
      default:
        return 'bg-gray-600 text-white border-gray-700 shadow-gray-500/20';
    }
  };

  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-in slide-in-from-top-2 duration-300">
      <div className={`flex items-center space-x-3 px-6 py-4 rounded-xl shadow-lg border backdrop-blur-sm ${getStyles()}`}>
        {getIcon()}
        <span className="font-medium text-sm">{message}</span>
        {type !== 'loading' && onClose && (
          <button
            onClick={onClose}
            className="ml-2 hover:opacity-70 transition-opacity p-1 rounded-md hover:bg-white/10"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {type === 'loading' && (
          <div className="flex space-x-1">
            <div className="w-1 h-1 bg-blue-200 rounded-full animate-pulse"></div>
            <div className="w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-75"></div>
            <div className="w-1 h-1 bg-blue-200 rounded-full animate-pulse delay-150"></div>
          </div>
        )}
      </div>
    </div>
  );
}