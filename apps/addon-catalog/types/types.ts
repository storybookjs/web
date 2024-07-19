import type { Database } from './database.types';

export type Addon = Database['public']['Tables']['addons']['Row'];
export type Author = Database['public']['Tables']['authors']['Row'];

export type AddonAuthor = Database['public']['Tables']['addon_author']['Row'];
// export interface AddonAuthorFull extends AddonAuthor {
//   author: Author;
// }
