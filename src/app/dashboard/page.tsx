'use client';
import { useState, useRef } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  visibleKey: string;  // Full key
  usage: number;
  monthlyLimit?: number;
  isVisible?: boolean;
}

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: ApiKey | null;
  onSave: (key: Partial<ApiKey>) => void;
}

function Modal({ isOpen, onClose, apiKey, onSave }: ModalProps) {
    console
  const [name, setName] = useState(apiKey?.name || '');
  const [monthlyLimit, setMonthlyLimit] = useState(apiKey?.monthlyLimit || 1000);
  const [limitEnabled, setLimitEnabled] = useState(!!apiKey?.monthlyLimit);
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Handle modal visibility
  if (isOpen && dialogRef.current && !dialogRef.current.open) {
    dialogRef.current.showModal();
  } else if (!isOpen && dialogRef.current?.open) {
    dialogRef.current.close();
  }

  return (
    <dialog
      ref={dialogRef}
      className="relative rounded-xl shadow-xl backdrop:bg-black/20 backdrop:backdrop-blur-sm border border-gray-200 p-0 max-w-md w-full"
      onClose={onClose}
    >
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-6">
          {apiKey ? 'Edit API key' : 'Create new API key'}
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Key Name — A unique name to identify this key.
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
                value={monthlyLimit}
                onChange={(e) => setMonthlyLimit(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="1000"
              />
            )}
            <p className="mt-2 text-sm text-gray-500">
              * If the combined usage of all your keys exceeds your plan's limit, all requests will be rejected.
            </p>
          </div>
          <div className="flex justify-end gap-3 mt-8">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onSave({
                  name,
                  monthlyLimit: limitEnabled ? monthlyLimit : undefined,
                });
                onClose();
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-800 rounded-lg"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'default',
      key: 'tvly-**********************3j2k',
      visibleKey: 'tvly-abcdef1234567890xyz3j2k',
      usage: 0,
      isVisible: false
    }
  ]);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);

  const generateObfuscatedKey = (fullKey: string) => {
    const prefix = fullKey.slice(0, 5);
    const suffix = fullKey.slice(-4);
    return `${prefix}${'*'.repeat(20)}${suffix}`;
  };

  const handleCreateKey = (keyData: Partial<ApiKey>) => {
    const fullKey = `tvly-${Math.random().toString(36).substr(2, 20)}${Math.random().toString(36).substr(2, 4)}`;
    const newKey = {
      id: Math.random().toString(36).substring(7),
      name: keyData.name || 'default',
      key: generateObfuscatedKey(fullKey),
      visibleKey: fullKey,
      usage: 0,
      monthlyLimit: keyData.monthlyLimit,
      isVisible: false
    };
    setApiKeys([...apiKeys, newKey]);
  };

  const handleEditKey = (keyData: Partial<ApiKey>) => {
    setApiKeys(apiKeys.map(key => 
      key.id === editingKey?.id 
        ? { ...key, ...keyData }
        : key
    ));
  };

  const handleDeleteKey = (id: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this API key? This action cannot be undone.');
    if (confirmed) {
      setApiKeys(apiKeys.filter(key => key.id !== id));
    }
  };

  const toggleKeyVisibility = (id: string) => {
    setApiKeys(apiKeys.map(key => {
      if (key.id === id) {
        return {
          ...key,
          key: key.isVisible ? generateObfuscatedKey(key.visibleKey) : key.visibleKey,
          isVisible: !key.isVisible
        };
      }
      return key;
    }));
  };

  const handleCopyKey = async (key: ApiKey) => {
    try {
      await navigator.clipboard.writeText(key.visibleKey);
      console.log('API key copied to clipboard');
    } catch (err) {
      console.error('Failed to copy API key:', err);
    }
  };

  return (
    <>
      {/* ... existing banner code ... */}

      {/* API Keys Section */}
      <div className="max-w-[1600px] mx-auto px-8 py-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-2">API Keys</h2>
            <p className="text-sm text-gray-600 max-w-2xl">
              The key is used to authenticate your requests to the Research API. 
              To learn more, see the documentation page.
            </p>
          </div>
          <button 
            onClick={() => setShowNewKeyModal(true)}
            className="flex items-center gap-2 rounded-lg bg-black text-white px-4 py-2.5 hover:bg-gray-900 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New API Key
          </button>
        </div>
        
        <div className="overflow-hidden rounded-xl border border-gray-100/20 bg-gray-900/50 backdrop-blur-sm">
          <table className="min-w-full divide-y divide-gray-800">
            <thead>
              <tr className="bg-gray-900/50">
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Usage</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Key</th>
                <th className="px-8 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Options</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {apiKeys.map((key) => (
                <tr key={key.id} className="hover:bg-gray-800/30">
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-medium text-gray-200">{key.name}</td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm text-gray-400">{key.usage}</td>
                  <td className="px-8 py-5 whitespace-nowrap text-sm font-mono text-gray-400">{key.key}</td>
                  <td className="px-8 py-5 whitespace-nowrap">
                    <div className="flex gap-6">
                      <button 
                        onClick={() => toggleKeyVisibility(key.id)}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                        title={key.isVisible ? "Hide API key" : "Show API key"}
                      >
                        {key.isVisible ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                      <button 
                        onClick={() => handleCopyKey(key)}
                        className="text-gray-400 hover:text-gray-200 transition-colors"
                        title="Copy API key"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => setEditingKey(key)}
                        className="text-gray-500 hover:text-gray-900"
                        title="Edit API key"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => handleDeleteKey(key.id)}
                        className="text-gray-500 hover:text-gray-900"
                        title="Delete API key"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        isOpen={!!editingKey}
        onClose={() => setEditingKey(null)}
        apiKey={editingKey}
        onSave={handleEditKey}
      />

      {/* New Key Modal */}
      <Modal
        isOpen={showNewKeyModal}
        onClose={() => setShowNewKeyModal(false)}
        apiKey={null}
        onSave={handleCreateKey}
      />
    </>
  );
} 