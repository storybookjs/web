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
          'ui-mx-auto ui-px-4 sm:ui-px-8',
          variant === 'default' && 'ui-max-w-8xl md:ui-px-8',
          variant === 'small' && 'ui-max-w-7xl md:ui-px-12',
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
