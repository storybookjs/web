export type Appearance = 'official' | 'integrator' | 'community';

export interface Addon {
  type?: 'Addon';
  name?: string;
  authors?: User[] | null;
  compatibility?: Framework[] | null;
  description?: string | null;
  disabled?: boolean | null;
  displayName?: string | null;
  downloadsAcceleration?: number | null;
  homepageUrl?: string | null;
  icon?: string | null;
  monthlyDownloads?: number | null;
  npmUrl?: string | null;
  publishedAt?: number | null;
  readme?: string | null;
  repositoryUrl?: string | null;
  status?: Status | null;
  tags?: Tag[] | null;
  verified?: Verified | null;
  verifiedCreator?: string | null;
  weeklyDownloads?: number | null;
  yearlyDownloads?: number | null;
}

export interface AddonSupabase {
  name: string;
  // compatibility?: Framework[] | null;
  description: string | null;
  // disabled: boolean | null;
  display_name: string | null;
  // downloadsAcceleration?: number | null;
  homepage_url: string | null;
  icon: string | null;
  // monthlyDownloads: number | null;
  // npmUrl?: string | null;
  // published_at: number | null;
  // readme: string | null;
  repository_url: string | null;
  status: Status | null;
  // tags?: Tag[] | null;
  verified: Verified | null;
  // verifiedCreator: string | null;
  weekly_downloads: number | null;
  // yearlyDownloads: number | null;
}

export interface AddonWithTagLinks extends Omit<Addon, 'tags'> {
  tags: TagLinkType[];
}

export type Framework = Pick<Tag, 'displayName' | 'icon' | 'name'>;

export interface Recipe {
  type: 'Recipe';
  name: string;
  accentColor: string | null;
  addons: Addon[] | null;
  authors: User[] | null;
  description: string | null;
  disabled: boolean | null;
  displayName: string | null;
  icon: string | null;
  monthlyViews: number | null;
  publishedAt: number | null;
  publisher: User | null;
  status: Status | null;
  tags: Tag[] | null;
  updatedAt: number | null;
  weeklyViews: number | null;
  yearlyViews: number | null;
}

export type Status = 'default' | 'essential' | 'deprecated';

export interface Tag {
  type?: 'Tag';
  // displayName is nullable in the GraphQL schema, but buildTagLinks implies it's always available
  displayName?: string;
  name: string;
  description?: string | null;
  disabled?: boolean | null;
  icon?: string | null;
  relatedTags?: Tag[] | null;
  topIntegrations?: {
    addons: Addon[] | null;
    recipes: Recipe[] | null;
  } | null;
  link?: string;
}

export interface User {
  type?: 'User';
  username: string;
  email?: string | null;
  gravatarUrl: string | null;
}

export type Verified = 'integrators' | 'official';

export interface TagLinkType {
  link: string;
  name: string;
}
