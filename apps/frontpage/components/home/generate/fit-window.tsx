import type { FC, ReactNode } from 'react';
import { useRef, useState } from 'react';
import { useIsomorphicLayoutEffect } from '../../../hooks/use-isomorphic-layout-effect';
import { ILLUSTRATION_SIZE } from '../illustrated-feature-list';

/** Space kept clear around the window inside the square stage */
const INSET = 28;

/**
 * Renders a wide, browser-window style visual at its natural `width` and
 * scales it down to fit the square illustration stage, so visuals built for
 * full-width rows can sit in the list-plus-panel block unchanged.
 * Below the `md` breakpoint those visuals switch to their narrow layouts, so
 * `mobileWidth` keeps them close to square instead of tall and tiny.
 */
export const FitWindow: FC<{
  width: number;
  mobileWidth?: number;
  children: ReactNode;
}> = ({ width: desktopWidth, mobileWidth = desktopWidth, children }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const width = isMobile ? mobileWidth : desktopWidth;

  useIsomorphicLayoutEffect(() => {
    const query = window.matchMedia('(max-width: 767px)');
    const update = () => {
      setIsMobile(query.matches);
    };
    update();
    query.addEventListener('change', update);
    return () => {
      query.removeEventListener('change', update);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;
    const measure = () => {
      setHeight(content.offsetHeight);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => {
      observer.disconnect();
    };
  }, []);

  const room = ILLUSTRATION_SIZE - INSET * 2;
  const scale = height ? Math.min(1, room / width, room / height) : room / width;

  return (
    <div className="flex h-full w-full items-center justify-center">
      <div
        className="relative"
        style={{ width: width * scale, height: height * scale }}
      >
        <div
          className="absolute left-0 top-0 origin-top-left"
          ref={contentRef}
          style={{ width, transform: `scale(${String(scale)})` }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};
