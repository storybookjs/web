import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/*
 * The generated docs page for RangeSlider, drawn over the canvas of the
 * 1200×830 Storybook frame. Docs mode has no toolbar, so it covers the
 * canvas from the top of the frame body (y 32) to the bottom.
 */
const FRAME = { width: 1200, height: 830 };
const CANVAS = { left: 251, top: 32, width: 949, height: 798 };

/** Canvas units inside the docs page, which is a size container. */
const u = (value: number) => `${String((value / CANVAS.width) * 100)}cqw`;
const pct = (value: number, of: number) => `${String((value / of) * 100)}%`;

const props = [
  { name: 'min', description: 'Lowest selectable value', value: '0' },
  { name: 'max', description: 'Highest selectable value', value: '100' },
  { name: 'value', description: 'Selected start and end', value: '[20, 80]' },
  { name: 'disabled', description: 'Turn off interaction', value: 'false' },
];

const ease = [0.22, 1, 0.36, 1] as const;

/*
 * On wide screens the demo zooms in, which crops the top and right of the
 * canvas, so the page content moves into the part that stays in view.
 */
const layout = {
  full: { top: 48, left: 80, right: 80, preview: 250, slider: 252 },
  zoomed: { top: 250, left: 56, right: 210, preview: 170, slider: 180 },
};

export function DocsPage({
  visible,
  zoomed = false,
}: {
  visible: boolean;
  zoomed?: boolean;
}) {
  const box = zoomed ? layout.zoomed : layout.full;
  const reduceMotion = useReducedMotion();
  const settle = (index: number) => ({
    initial: false as const,
    animate: visible
      ? { opacity: 1, y: 0 }
      : { opacity: 0, y: reduceMotion ? 0 : u(12) },
    transition: {
      duration: 0.4,
      ease,
      delay: visible && !reduceMotion ? 0.06 * index : 0,
    },
  });

  return (
    <motion.div
      animate={{ opacity: visible ? 1 : 0 }}
      aria-hidden
      className="pointer-events-none absolute z-[3] bg-white"
      initial={false}
      style={{
        left: pct(CANVAS.left, FRAME.width),
        top: pct(CANVAS.top, FRAME.height),
        width: pct(CANVAS.width, FRAME.width),
        height: pct(CANVAS.height, FRAME.height),
        containerType: 'size',
        borderBottomRightRadius: u(8),
      }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="absolute flex flex-col text-[#2E3438]"
        style={{
          left: u(box.left),
          right: u(box.right),
          top: u(box.top),
          gap: u(16),
        }}
      >
        <motion.div {...settle(0)}>
          <div
            className="font-bold leading-none"
            style={{ fontSize: u(30), marginBottom: u(12) }}
          >
            RangeSlider
          </div>
          <div
            className="leading-snug text-[#5C6870]"
            style={{ fontSize: u(15) }}
          >
            Select a span of values. Drag either handle or type a value.
          </div>
        </motion.div>

        <motion.div
          {...settle(1)}
          className="relative border border-[#E3E6E8]"
          style={{ height: u(box.preview), borderRadius: u(6) }}
        >
          <motion.img
            alt=""
            className="absolute left-1/2 top-1/2 block h-auto -translate-x-1/2 -translate-y-1/2"
            height="303"
            src="/home/develop/range-slider-default.svg"
            style={{ width: u(box.slider) }}
            width="370"
          />
          <div
            className="absolute bottom-0 right-0 border-l border-t border-[#E3E6E8] font-bold text-[#5C6870]"
            style={{
              fontSize: u(11),
              padding: `${u(5)} ${u(10)}`,
              borderTopLeftRadius: u(6),
            }}
          >
            Show code
          </div>
        </motion.div>

        <motion.div
          {...settle(2)}
          className="overflow-hidden border border-[#E3E6E8]"
          style={{ borderRadius: u(6), fontSize: u(13) }}
        >
          <div
            className="grid bg-[#F6F9FC] font-bold uppercase text-[#5C6870]"
            style={{
              gridTemplateColumns: '1fr 2.4fr 1fr',
              padding: `${u(9)} ${u(16)}`,
              fontSize: u(10),
              letterSpacing: '0.08em',
            }}
          >
            <span>Name</span>
            <span>Description</span>
            <span>Default</span>
          </div>
          {props.map((prop) => (
            <div
              className="grid border-t border-[#E3E6E8]"
              key={prop.name}
              style={{
                gridTemplateColumns: '1fr 2.4fr 1fr',
                padding: `${u(10)} ${u(16)}`,
              }}
            >
              <span className="font-bold">{prop.name}</span>
              <span className="text-[#5C6870]">{prop.description}</span>
              <span className="font-mono text-[#5C6870]">{prop.value}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
