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
      className="relative rounded-xl shadow-xl backdrop:bg-black/20 backdrop:backdrop-blur-sm p-0 max-w-md w-full bg-white"
      onClose={onClose}
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">
          {mode === 'create' ? 'Create new API key' : 'Edit API key'}
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Name — A unique name to identify this key
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="limitToggle" className="text-sm font-medium text-gray-700">
                Limit monthly usage*
              </label>
            </div>
            {limitEnabled && (
              <input
                type="number"
                value={monthlyLimit || ''}
                onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1000"
              />
            )}
            <p className="mt-2 text-sm text-gray-500">
              * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
            </p>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfirm(name, limitEnabled ? monthlyLimit : undefined);
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
            >
              {mode === 'create' ? 'Create' : 'Save'}
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}