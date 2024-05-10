import { cn } from '@repo/utils';
import type { FC, ReactNode } from 'react';
import { Slot } from '@radix-ui/react-slot';

interface ContainerProps {
  variant?: 'default' | 'small';
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

export const Container: FC<ContainerProps> = ({
  variant = 'default',
  children,
  className,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(
        'mx-auto px-4 sm:px-8',
        variant === 'default' && 'max-w-8xl md:px-8',
        variant === 'small' && 'max-w-7xl md:px-12',
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  );
};
