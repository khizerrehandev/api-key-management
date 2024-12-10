'use client';
import React from 'react';
import { type ApiKey } from '../../lib/services/apiKeyService';
import { ActionButtons } from './ActionButtons';

interface ApiKeysTableProps {
  apiKeys: ApiKey[];
  onToggleVisibility: (id: string) => void;
  onCopy: (key: ApiKey) => void;
  onEdit: (key: ApiKey) => void;
  onDelete: (id: string) => void;
}

export function ApiKeysTable({
  apiKeys,
  onToggleVisibility,
  onCopy,
  onEdit,
  onDelete
}: ApiKeysTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-100/20 bg-gray-900/50 backdrop-blur-sm">
      <table className="w-full divide-y divide-gray-800">
        <thead>
          <tr className="bg-gray-900/50">
            <th className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Name</th>
            <th className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Usage</th>
            <th className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Key</th>
            <th className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Monthly Limit</th>
            <th className="px-4 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Created At</th>
            <th className="px-4 py-4 text-right text-xs font-medium text-gray-400 uppercase tracking-wider w-[140px]">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800">
          {apiKeys.map((key) => (
            <tr key={key.id} className="hover:bg-gray-800/30">
              <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-200">{key.name}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-400">{key.usage}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-400">{key.key}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-400">{key.monthlyLimit}</td>
              <td className="px-4 py-4 whitespace-nowrap text-sm font-mono text-gray-400">
                {new Date(key.created_at).toLocaleString()}
              </td>
              <td className="px-4 py-4 whitespace-nowrap text-right">
                <div className="flex justify-end items-center gap-2">
                  <ActionButtons 
                    apiKey={key}
                    onToggleVisibility={() => onToggleVisibility(key.id)}
                    onCopy={() => onCopy(key)}
                    onEdit={() => onEdit(key)}
                    onDelete={() => onDelete(key.id)}
                  />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}