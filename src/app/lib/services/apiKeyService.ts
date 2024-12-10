import { supabase } from '../supabase';
import type { DbApiKey } from '../supabase';

export interface ApiKey {
  id: string;
  name: string;
  key: string;
  visibleKey: string;
  isVisible?: boolean;
  monthlyLimit?: number;
  created_at: string;
  usage?: number;
}

export const apiKeyService = {
  generateKey: () => {
    const uniqueStr = Math.random().toString(36).substr(2, 20);
    const checksumStr = Math.random().toString(36).substr(2, 4);
    return `krehan-${uniqueStr}-${checksumStr}`;
  },

  generateObfuscatedKey: (fullKey: string) => {
    const prefix = fullKey.slice(0, 5);
    const suffix = fullKey.slice(-4);
    return `${prefix}${'*'.repeat(20)}${suffix}`;
  },

  fetchApiKeys: async (): Promise<ApiKey[]> => {
    const { data, error } = await supabase.from('api_keys').select('*');
    if (error) throw error;
    return data;
  },

  createApiKey: async (keyData: Partial<ApiKey>): Promise<ApiKey> => {
    const fullKey = apiKeyService.generateKey();
    const { data, error } = await supabase
      .from('api_keys')
      .insert({
        name: keyData.name || 'default',
        key: fullKey,
        monthly_limit: keyData.monthlyLimit,
        created_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  updateApiKey: async (id: string, keyData: Partial<ApiKey>): Promise<void> => {
    const { error } = await supabase
      .from('api_keys')
      .update({
        name: keyData.name,
        monthly_limit: keyData.monthlyLimit
      })
      .eq('id', id);

    if (error) throw error;
  },

  deleteApiKey: async (id: string): Promise<void> => {
    const { error } = await supabase
      .from('api_keys')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
}; 