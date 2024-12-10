'use client';
import { useState, useCallback } from 'react';
import { apiKeyService, type ApiKey } from '../lib/services/apiKeyService';

export const useApiKeys = () => {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [deletingKeyId, setDeletingKeyId] = useState<string | null>(null);
  const [showNewKeyModal, setShowNewKeyModal] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '' });

  const fetchApiKeys = useCallback(async () => {
    try {
      const data = await apiKeyService.fetchApiKeys();
      const formattedKeys = data.map(key => ({
        ...key,
        key: apiKeyService.generateObfuscatedKey(key.key),
        visibleKey: key.key,
        isVisible: false
      }));
      setApiKeys(formattedKeys);
    } catch (error) {
      console.error('Error fetching API keys:', error);
      setSnackbar({ open: true, message: 'Failed to fetch API keys' });
    }
  }, []);

  const handleCreateKey = async (keyData: Partial<ApiKey>) => {
    try {
      const data = await apiKeyService.createApiKey(keyData);
      const newKey = {
        ...data,
        key: apiKeyService.generateObfuscatedKey(data.key),
        visibleKey: data.key,
        isVisible: false
      };
      setApiKeys([...apiKeys, newKey]);
      setSnackbar({ open: true, message: 'API key created successfully' });
    } catch (error) {
      console.error('Error creating API key:', error);
      setSnackbar({ open: true, message: 'Failed to create API key' });
    }
  };

  const handleEditKey = async (keyData: Partial<ApiKey>) => {
    try {
      if (!editingKey?.id) return;
      await apiKeyService.updateApiKey(editingKey.id, keyData);
      setApiKeys(apiKeys.map(key => 
        key.id === editingKey.id 
          ? { ...key, ...keyData }
          : key
      ));
      setSnackbar({ open: true, message: 'API key updated successfully' });
    } catch (error) {
      console.error('Error updating API key:', error);
      setSnackbar({ open: true, message: 'Failed to update API key' });
    }
  };

  const handleDeleteKey = async (id: string) => {
    try {
      await apiKeyService.deleteApiKey(id);
      setApiKeys(apiKeys.filter(key => key.id !== id));
      setSnackbar({ open: true, message: 'API key deleted successfully' });
    } catch (error) {
      console.error('Error deleting API key:', error);
      setSnackbar({ open: true, message: 'Failed to delete API key' });
    }
  };

  const toggleKeyVisibility = (id: string) => {
    setApiKeys(apiKeys.map(key => {
      if (key.id === id) {
        return {
          ...key,
          key: key.isVisible ? apiKeyService.generateObfuscatedKey(key.visibleKey) : key.visibleKey,
          isVisible: !key.isVisible
        };
      }
      return key;
    }));
  };

  const handleCopyKey = async (key: ApiKey) => {
    try {
      await navigator.clipboard.writeText(key.visibleKey);
      setSnackbar({ open: true, message: 'API key copied to clipboard' });
    } catch (err) {
      console.error('Failed to copy API key:', err);
      setSnackbar({ open: true, message: 'Failed to copy API key' });
    }
  };

  return {
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
  };
}; 