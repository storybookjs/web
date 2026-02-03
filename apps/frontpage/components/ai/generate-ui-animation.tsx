import Image from 'next/image';
import { motion } from 'framer-motion';

const components = [
  {
    image: '/ai/cascade.svg',
    title: 'Cascade graph component',
    visible: { opacity: 1 },
  },
  {
    image: '/ai/line-graph-teal.svg',
    title: 'Line graph teal component',
    visible: { opacity: 1 },
  },
  {
    image: '/ai/slider.svg',
    title: 'Slider component',
    visible: { opacity: 0.3 },
  },
  {
    image: '/ai/date-picker.svg',
    title: 'Datepicker component',
    visible: { opacity: 0.3 },
  },
  {
    image: '/ai/multiselect.svg',
    title: 'Multiselect component',
    visible: { opacity: 0.3 },
  },
  {
    image: '/ai/pie-chart.svg',
    title: 'Pie chart component',
    visible: { opacity: 1 },
  },
  {
    image: '/ai/marketing-buttons.svg',
    title: 'Marketing buttons component',
    visible: { opacity: 0.3 },
  },
  {
    image: '/ai/histogram.svg',
    title: 'Histogram component',
    visible: { opacity: 1 },
  },
  {
    image: '/ai/text.svg',
    title: 'Text component',
    visible: { opacity: 1 },
  },
];

export default function StaggeredGrid() {
  const cells = components.map(({ image, title, visible }, index) => (
    <motion.div
      whileInView={{
        scale: [0.3, 1, 1, 1],
        opacity: [0, 1, 1, visible.opacity],
      }}
      viewport={{ amount: 0.75, once: true }}
      transition={{
        duration: 1.2,
        times: [0, 0.25, 0.6, 1], // pop in (0-25%), hold (25-60%), then final state (60-100%)
        ease: ['easeOut', 'linear', 'easeInOut'],
        delay: index * 0.05,
      }}
      key={title}
      className="border-gradient relative flex aspect-square flex-col items-center gap-4 rounded bg-white opacity-0"
    >
      <Image
        className="w-100 h-100 block"
        src={image}
        alt={title}
        width={180}
        height={180}
      />
    </motion.div>
  ));

  return (
    <div className="relative grid grid-cols-3 justify-center gap-2 p-12 sm:gap-4 md:grid-cols-[repeat(3,_minmax(auto,_100px))] md:px-12 md:py-20">
      <div className="absolute left-4 top-4 text-[11px] font-extrabold uppercase leading-4 tracking-[0.35em] text-white/70 sm:left-8 sm:top-8">
        Your Components
      </div>
      {cells}
    </div>
  );
}

const MotionImage = motion(Image);

export function GenerateUIAnimation() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <StaggeredGrid />
      <div className="relative flex items-center justify-center bg-[url(/ai/agent-output-bg.svg)] bg-cover bg-center bg-no-repeat p-12 md:px-12 md:py-20">
        <div className="absolute left-4 top-4 text-[11px] font-extrabold uppercase leading-4 tracking-[0.35em] text-white/70 sm:left-8 sm:top-8">
          Agent Output
        </div>
        <MotionImage
          viewport={{ amount: 0.75, once: true }}
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ ease: 'easeOut', delay: 1 }}
          src="/ai/app-example.svg"
          alt="App Example"
          width={451}
          height={343}
        />
      </div>
    </div>
  );
}
