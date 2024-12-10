'use client';
import { useEffect } from 'react';
import { useApiKeys } from '../hooks/useApiKeys';
import { CreateKeyDialog } from './components/CreateKeyDialog';
import { DeleteKeyDialog } from './components/DeleteKeyDialog';
import { ApiKeysTable } from './components/ApiKeysTableProps';
import { Snackbar } from './components/Snackbar';
import { PlanBanner } from './components/PlanBanner';

export default function Dashboard() {
  const {
    apiKeys,
    editingKey,
    deletingKeyId,
    showNewKeyModal,
    snackbar,
    setEditingKey,
    setDeletingKeyId,
    setShowNewKeyModal,
    setSnackbar,
    fetchApiKeys,
    handleCreateKey,
    handleEditKey,
    handleDeleteKey,
    toggleKeyVisibility,
    handleCopyKey
  } = useApiKeys();

  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  // Wrapper functions to match CreateKeyDialog prop types
  const handleCreateWrapper = (name: string, monthlyLimit?: number) => {
    handleCreateKey({ name, monthlyLimit });
  };

  const handleEditWrapper = (name: string, monthlyLimit?: number) => {
    handleEditKey({ name, monthlyLimit });
  };

  return (
    <>
      <PlanBanner plan="Free" apiLimit={800} maxLimit={1000} />

      {/* API Keys Section */}
      <div className="max-w-[1600px] mx-auto px-8 py-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">API Keys</h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl">
              The key is used to authenticate your requests to the Research API. 
              To learn more, see the documentation page.
            </p>
          </div>
          <button 
            onClick={() => setShowNewKeyModal(true)}
            className="flex items-center gap-2 rounded-lg bg-blue-600 dark:bg-blue-500 text-white px-4 py-2.5 hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors font-medium"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New API Key
          </button>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 backdrop-blur-sm">
          <ApiKeysTable 
            apiKeys={apiKeys}
            onToggleVisibility={toggleKeyVisibility}
            onCopy={handleCopyKey}
            onEdit={setEditingKey}
            onDelete={setDeletingKeyId}
          />
        </div>
      </div>

      <CreateKeyDialog
        isOpen={!!editingKey}
        onClose={() => setEditingKey(null)}
        initialData={editingKey ? { name: editingKey.name, monthlyLimit: editingKey.monthlyLimit } : undefined}
        onConfirm={handleEditWrapper}
        mode="edit"
      />

      <CreateKeyDialog
        isOpen={showNewKeyModal}
        onClose={() => setShowNewKeyModal(false)}
        onConfirm={handleCreateWrapper}
        mode="create"
      />

      <DeleteKeyDialog
        isOpen={!!deletingKeyId}
        onClose={() => setDeletingKeyId(null)}
        onConfirm={() => {
          if (deletingKeyId) {
            handleDeleteKey(deletingKeyId);
          }
        }}
      />

      <Snackbar
        message={snackbar.message}
        isOpen={snackbar.open}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
} 