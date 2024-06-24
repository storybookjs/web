declare module 'rehype-urls';

type Appearance = 'official' | 'integrator' | 'community';

interface Addon {
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

interface Framework extends Pick<Tag, 'displayName' | 'icon' | 'name'> {}

interface Recipe {
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

type Status = 'default' | 'essential' | 'deprecated';

interface Tag {
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

interface User {
  type?: 'User';
  username: string;
  email?: string | null;
  gravatarUrl: string | null;
}

type Verified = 'integrators' | 'official';

interface TagLinkType {
  link: string;
  name: string;
}
