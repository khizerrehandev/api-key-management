// src/app/dashboard/components/CreateKeyDialog.tsx
'use client';
import { useState, useRef, useEffect } from 'react';

interface CreateKeyDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (name: string, monthlyLimit?: number) => void;
  initialData?: { name: string; monthlyLimit?: number };
  mode?: 'create' | 'edit';
}

export function CreateKeyDialog({ 
  isOpen, 
  onClose, 
  onConfirm, 
  initialData,
  mode = 'create' 
}: CreateKeyDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState(initialData?.name || '');
  const [monthlyLimit, setMonthlyLimit] = useState<number | undefined>(initialData?.monthlyLimit);
  const [limitEnabled, setLimitEnabled] = useState(!!initialData?.monthlyLimit);

  useEffect(() => {
    if (isOpen && dialogRef.current && !dialogRef.current.open) {
      dialogRef.current.showModal();
      if (initialData) {
        setName(initialData.name);
        setMonthlyLimit(initialData.monthlyLimit);
        setLimitEnabled(!!initialData.monthlyLimit);
      }
    } else if (!isOpen && dialogRef.current?.open) {
      dialogRef.current.close();
    }
  }, [isOpen, initialData]);

  return (
    <dialog
      ref={dialogRef}
      className="relative rounded-xl shadow-xl backdrop:bg-black/20 backdrop:backdrop-blur-sm border border-gray-800 p-0 max-w-md w-full bg-gray-900"
      onClose={onClose}
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6 text-white">
          {mode === 'edit' ? 'Edit API key' : 'Create new API key'}
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Key Name — A unique name to identify this key
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
              placeholder="default"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-2">
              <input
                type="checkbox"
                id="limitToggle"
                checked={limitEnabled}
                onChange={(e) => setLimitEnabled(e.target.checked)}
                className="rounded border-gray-700 text-blue-600 focus:ring-blue-500 bg-gray-800"
              />
              <label htmlFor="limitToggle" className="text-sm font-medium text-gray-300">
                Limit monthly usage*
              </label>
            </div>
            {limitEnabled && (
              <input
                type="number"
                value={monthlyLimit || ''}
                onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100"
                placeholder="1000"
              />
            )}
            <p className="mt-2 text-sm text-gray-400">
              * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
            </p>
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 hover:bg-gray-800 rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(name, limitEnabled ? monthlyLimit : undefined);
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              {mode === 'edit' ? 'Save Changes' : 'Create Key'}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}