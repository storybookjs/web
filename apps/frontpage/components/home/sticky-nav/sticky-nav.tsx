import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpIcon } from '@storybook/icons';
import Link from 'next/link';
import { Container, Button } from '@repo/ui';
import { MobileMenu } from './mobile-menu';

interface StickyNavProps {
  isVisible?: boolean;
  activeSection: SectionId | null;
}

type SectionId =
  | 'context'
  | 'verify'
  | 'agents'
  | 'share'
  | 'automate'
  | 'who';

const items: { id: SectionId; label: string; href: string }[] = [
  { id: 'context', label: 'Context', href: '#context' },
  { id: 'verify', label: 'Verify', href: '#verify' },
  { id: 'agents', label: 'Agents', href: '#agents' },
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
          className="fixed top-0 z-50 w-full h-10 md:h-18 bg-slate-950"
          exit={{ opacity: 0 }}
          initial={{ opacity: 0 }}
          {...props}
        >
          <Container
            asChild
            className="flex items-center justify-between h-full"
          >
            <section>
              <MobileMenu
                items={items}
                label={activeItem?.label ?? items[0]?.label ?? ''}
              />
              <div className="items-center hidden gap-2 md:flex">
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
                {/* Hidden on mobile by the wrapper: Button's own display class
                    wins over a hidden passed to it */}
                <div className="hidden md:block">
                  <Button asChild size="md" variant="ghostHome">
                    <a href="#page-top">
                      <ArrowUpIcon />
                      Jump to top
                    </a>
                  </Button>
                </div>
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
