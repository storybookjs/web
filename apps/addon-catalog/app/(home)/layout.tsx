import { type ReactNode } from 'react';
import { HomeWrapper } from '../../components/home-wrapper';

export default function Layout({ children }: { children: ReactNode }) {
  return <HomeWrapper>{children}</HomeWrapper>;
}
