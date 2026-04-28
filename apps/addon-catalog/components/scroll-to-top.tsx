'use client';

import { useEffect, useState } from 'react';
import { ArrowUpIcon } from '@storybook/icons';
import { cn } from '@repo/utils';

export function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={cn(
        'fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-blue-500 text-white shadow-lg transition-all duration-300 hover:bg-blue-600 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 dark:bg-blue-600 dark:hover:bg-blue-700',
        isVisible
          ? 'translate-y-0 opacity-100'
          : 'pointer-events-none translate-y-16 opacity-0'
      )}
      aria-label="Scroll to top"
    >
      <ArrowUpIcon className="h-6 w-6" />
    </button>
  );
}
