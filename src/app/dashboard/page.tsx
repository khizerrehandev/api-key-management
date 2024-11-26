'use client';
import { useState } from 'react';

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: 'active' | 'expired' | 'revoked';
}

export default function Dashboard() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Production API Key',
      key: 'pk_live_**********************3j2k',
      created: '2024-03-15',
      lastUsed: '2024-03-20',
      status: 'active'
    },
    {
      id: '2',
      name: 'Development API Key',
      key: 'pk_test_**********************9f8h',
      created: '2024-03-10',
      lastUsed: '2024-03-19',
      status: 'active'
    }
  ]);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">API Keys Dashboard</h1>
        <button 
          className="rounded-full border border-solid border-transparent bg-foreground text-background px-4 py-2 hover:bg-[#383838] dark:hover:bg-[#ccc] transition-colors"
          onClick={() => {
            // TODO: Implement create new key functionality
            alert('Create new key modal will open here');
          }}
        >
          Create New API Key
        </button>
      </div>
      
      <div className="space-y-4 mt-8">
        {apiKeys.length === 0 ? (
          <div className="p-4 border rounded-lg dark:border-white/[.145]">
            <p className="text-gray-500 dark:text-gray-400">
              No API keys found. Create your first API key to get started.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto rounded-lg border dark:border-white/[.145]">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">API Key</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Last Used</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{key.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-mono">{key.key}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{key.created}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">{key.lastUsed}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${key.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 
                          key.status === 'expired' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' : 
                          'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                        {key.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex gap-2">
                        <button 
                          className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          onClick={() => {
                            // TODO: Implement edit functionality
                            alert(`Edit key ${key.id}`);
                          }}
                        >
                          Edit
                        </button>
                        <button 
                          className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          onClick={() => {
                            // TODO: Implement delete functionality
                            alert(`Delete key ${key.id}`);
                          }}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
} 