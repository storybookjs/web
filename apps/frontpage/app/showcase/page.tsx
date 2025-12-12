import dynamic from 'next/dynamic';

// Dynamically import HomeWrapper from addon-catalog for SSR compatibility
const HomeWrapper = dynamic(
  () => import('../../../addon-catalog/components/home-wrapper').then(mod => mod.HomeWrapper),
  { ssr: false }
);

export default function ShowcasePage() {
  // The HomeWrapper will handle search and display logic
  return <HomeWrapper />;
}
