interface Author {
  id: string;
  name?: string;
  avatarUrl?: string;
}

type Tag = {
  name: string;
  displayName: string;
  description: string;
  icon: string;
};

type Addon = {
  id: string;
  repositoryUrl: string;
  npmUrl: string;
  tags: Tag[];
  authors: Author[];
};

type Recipe = {
  id: string;
  repositoryUrl: string;
  npmUrl: string;
  tags: Tag[];
  authors: Author[];
};
