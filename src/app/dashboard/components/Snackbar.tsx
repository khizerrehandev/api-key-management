// src/app/components/Snackbar.tsx
'use client';
import { useEffect } from 'react';

interface SnackbarProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

export function Snackbar({ message, isOpen, onClose }: SnackbarProps) {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
      <svg className="w-4 h-4 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
      {message}
    </div>
  );
}