import type { Database } from './database.types';

export type Addon = Database['public']['Tables']['addons']['Row'];
export type Author = Database['public']['Tables']['authors']['Row'];
export type Tag = Database['public']['Tables']['tags']['Row'];
