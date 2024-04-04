import { cn } from '@utils';
import '../styles.css';

export function Header() {
  return (
    <h1 className={cn('bg-red-600', true && 'text-blue-600')}>
      Hello World Coco
    </h1>
  );
}
