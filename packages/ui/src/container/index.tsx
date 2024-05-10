import { cn } from '@repo/utils';
import type {
  ForwardRefExoticComponent,
  RefAttributes,
  ReactNode,
} from 'react';
import { forwardRef } from 'react';
import { Slot } from '@radix-ui/react-slot';

interface ContainerProps {
  variant?: 'default' | 'small';
  children: ReactNode;
  className?: string;
  asChild?: boolean;
}

export const Container: ForwardRefExoticComponent<
  ContainerProps & RefAttributes<HTMLDivElement>
> = forwardRef<HTMLDivElement, ContainerProps>(
  (
    { variant = 'default', children, className, asChild = false, ...props },
    ref,
  ) => {
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        className={cn(
          'mx-auto px-4 sm:px-8',
          variant === 'default' && 'max-w-8xl md:px-8',
          variant === 'small' && 'max-w-7xl md:px-12',
          className,
        )}
        ref={ref}
        {...props}
      >
        {children}
      </Comp>
    );
  },
);

Container.displayName = 'Container';
