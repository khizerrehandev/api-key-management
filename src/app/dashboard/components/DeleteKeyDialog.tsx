'use client';
import { useRef, useEffect } from 'react';

interface DeleteKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function DeleteKeyDialog({ isOpen, onClose, onConfirm }: DeleteKeyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (isOpen && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
    } else if (!isOpen && dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [isOpen]);

  return (
    <dialog
      ref={dialogRef}
      className="relative rounded-xl shadow-xl backdrop:bg-black/20 backdrop:backdrop-blur-sm border border-gray-800 p-0 max-w-md w-full bg-[#0B0F17]"
      onClose={onClose}
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 text-white">Delete API Key</h2>
        <p className="text-gray-400 mb-6">
          Are you sure you want to delete this API key? This action cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 text-sm text-white bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </dialog>
  );
}