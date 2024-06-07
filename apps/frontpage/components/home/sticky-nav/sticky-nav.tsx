import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpIcon } from '@storybook/icons';
import Link from 'next/link';
import { Container } from '@repo/ui';
import { Button } from '../../ui/button';
import { MobileMenu } from './mobile-menu';

interface StickyNavProps {
  isVisible?: boolean;
  activeSection:
    | 'who'
    | 'automate'
    | 'share'
    | 'document'
    | 'test'
    | 'develop'
    | null;
}

const items = [
  { id: 'develop', label: 'Develop', href: '#develop' },
  { id: 'test', label: 'Test', href: '#test' },
  { id: 'document', label: 'Document', href: '#document' },
  { id: 'share', label: 'Share', href: '#share' },
  { id: 'automate', label: 'Automate', href: '#automate' },
  { id: 'who', label: "Who's it for", href: '#who' },
];

export function StickyNav({
  isVisible,
  activeSection,
  ...props
}: StickyNavProps) {
  const activeItem = items.find((item) => item.id === activeSection);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          animate={{ opacity: 1 }}
          className="md:h-18 fixed top-0 z-50 h-10 w-full bg-slate-950"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          {...props}
        >
          <Container
            asChild
            className="flex h-full items-center justify-between"
          >
            <section>
              <MobileMenu
                items={items}
                label={activeItem?.label || items[0]?.label || ''}
              />
              <div className="hidden items-center gap-2 md:flex">
                {items.map((item) => (
                  <Button
                    active={activeSection === item.id ? 'home' : undefined}
                    asChild
                    key={item.id}
                    size="md"
                    variant="ghostHome"
                  >
                    <a href={item.href}>{item.label}</a>
                  </Button>
                ))}
              </div>
              <div className="flex items-center gap-5">
                <Button asChild size="md" variant="ghostHome">
                  <a className="hidden items-center md:flex" href="#page-top">
                    <ArrowUpIcon />
                    Jump to top
                  </a>
                </Button>
                <Button asChild rounded="full" size="sm" variant="solid">
                  <Link href="/docs">Get started</Link>
                </Button>
              </div>
            </section>
          </Container>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
