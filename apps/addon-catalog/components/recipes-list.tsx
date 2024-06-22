'use client';

import React, { useState, useMemo, ComponentProps } from 'react';
import { RecipeItem } from './recipe-item';

// TODO: Button 😱
// https://github.com/storybookjs/design-system/blob/master/src/components/Button.tsx
const Button = (props: any) => <button {...props} />;

interface RecipesListProps {
  recipeItems?: ({ id: string } & ComponentProps<typeof RecipeItem>)[];
  isLoading?: boolean;
  from?: {
    title: string;
    link: string;
  };
}

const ListWrapper = (props: any) => <div {...props} />;
// > *:not(:last-child) {
//   margin-bottom: ${spacing.padding.medium}px;
// }

const loadingItems = [
  { id: '1', isLoading: true },
  { id: '2', isLoading: true },
  { id: '3', isLoading: true },
  { id: '4', isLoading: true },
  { id: '5', isLoading: true },
  { id: '6', isLoading: true },
];

export const RecipesList = ({
  recipeItems = [
    { id: '1', isLoading: true },
    { id: '2', isLoading: true },
    { id: '3', isLoading: true },
    { id: '4', isLoading: true },
  ],
  isLoading,
  from,
  ...props
}: RecipesListProps) => {
  const [visibleCount, setVisibleCount] = useState(6);
  const items = useMemo(
    () => recipeItems.slice(0, visibleCount),
    [visibleCount, recipeItems],
  );

  const loadMore = () => {
    setVisibleCount(Math.min(visibleCount + 6, recipeItems.length));
  };

  return (
    <ListWrapper
      role="feed"
      aria-live={isLoading ? 'polite' : 'off'}
      aria-busy={!!isLoading}
      {...props}
    >
      {(isLoading ? loadingItems : items).map((recipe) => (
        <RecipeItem
          key={recipe.id}
          from={from}
          orientation="horizontal"
          {...recipe}
        />
      ))}
      {recipeItems.length > 6 && visibleCount < recipeItems.length && (
        <Button tertiary onClick={loadMore}>
          Load more recipes
        </Button>
      )}
    </ListWrapper>
  );
};
