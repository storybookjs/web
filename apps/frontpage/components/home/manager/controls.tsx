import { cn } from '@repo/utils';
import { useEffect, useState, type FC, type ReactNode } from 'react';
import type { ValueAnimationTransition } from 'framer-motion';
import { motion, useAnimate } from 'framer-motion';
import Image from 'next/image';
import { useMediaQuery } from '../../../hooks/use-media-query';
import hand from './hand.svg';

export const Controls: FC<{ isPanel?: boolean; isAnimated?: boolean }> = ({
  isPanel = false,
  isAnimated = true,
}) => {
  const [scope, animate] = useAnimate();
  const [hex, setHex] = useState('#D8DDDD');
  const [isMobile] = useMediaQuery('(max-width: 640px)');

  useEffect(() => {
    let isCancelled = false;
    const enterAnimation = async () => {
      const animateIfNotCancelled = async (
        animation: {
          opacity?: number;
          scale?: number;
          x?: number;
          y?: number;
          fill?: string;
        },
        options?: ValueAnimationTransition,
      ) => {
        if (!isCancelled && scope.current) {
          await animate(scope.current, animation, options);
        }
      };

      await animateIfNotCancelled({ y: 280 });
      await animateIfNotCancelled(
        {
          x: 264,
          y: 186,
          opacity: 1,
        },
        { duration: 0.4 },
      );
      await animateIfNotCancelled(
        { scale: 0.8 },
        { duration: 0.1, delay: 0.2 },
      );
      await animateIfNotCancelled({ scale: 1 }, { duration: 0.1 });
      await animateIfNotCancelled(
        { x: 240, y: 132 },
        { duration: 0.2, delay: 1 },
      );
      await animateIfNotCancelled(
        { scale: 0.8 },
        { duration: 0.1, delay: 0.2 },
      );
      setHex('#485353');
      await animateIfNotCancelled({ scale: 1 }, { duration: 0.1 });
      await animateIfNotCancelled(
        { opacity: 0 },
        { duration: 0.4, delay: 1.8 },
      );
    };

    if (scope.current && isAnimated && !isMobile) {
      void enterAnimation();
    }

    return () => {
      isCancelled = true;
    };
  }, [animate, scope, isAnimated, isMobile]);
  return (
    <div className="relative">
      <Image
        alt="Hand"
        className="absolute top-0 z-20 opacity-0"
        height={48}
        ref={scope}
        src={hand}
        width={48}
      />
      <Line
        control={
          <Input value="Introducing the Space Helmet X24: a sleek, durable motorcycle helmet with advanced ventilation, anti-fog visor, and stylish graphics. Experience ultimate protection and comfort for your rides." />
        }
        description="description paragraph"
        isPanel={isPanel}
        label="description"
        required
      />
      <Line
        control={<Input value="Space Helmet X24" />}
        description="Button label"
        isPanel={isPanel}
        label="productTitle"
        required
      />
      <Line
        control={
          <div className="flex h-7 w-full items-center justify-between rounded border border-[#D9E0E6] px-2">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{
                  backgroundColor:
                    isAnimated && !isMobile ? '#485353' : '#D8DDDD',
                }}
                className="h-4 w-4 rounded border border-[#D9E0E6]"
                initial={{ backgroundColor: '#D8DDDD' }}
                transition={{ duration: 0.2, delay: 2.7 }}
              />
              {hex}
            </div>
            <svg
              fill="none"
              height="12"
              width="12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#a)" fill="#73828C">
                <path d="M7.7 1.399a.429.429 0 0 0-.828-.226l-2.571 9.429a.429.429 0 0 0 .827.225L7.699 1.4ZM2.846 3.1a.429.429 0 0 1 .055.603L.986 6l1.915 2.297a.429.429 0 0 1-.659.549L.1 6.274a.429.429 0 0 1 0-.548l2.143-2.572a.429.429 0 0 1 .604-.055ZM9.154 3.1a.429.429 0 0 0-.055.603L11.014 6 9.099 8.297a.429.429 0 0 0 .659.549L11.9 6.274a.429.429 0 0 0 0-.548L9.758 3.154a.429.429 0 0 0-.604-.055Z" />
              </g>
              <defs>
                <clipPath id="a">
                  <path d="M0 0h12v12H0z" fill="#fff" />
                </clipPath>
              </defs>
            </svg>
          </div>
        }
        description="Card background color"
        isPanel={isPanel}
        label="backgroundColor"
      />
      <Line
        control={
          <div className="relative flex h-8 items-center rounded-full bg-slate-200 px-0.5">
            <div className="relative z-10 flex items-center justify-center h-full w-14">
              False
            </div>
            <div className="relative z-10 flex items-center justify-center h-full w-14">
              True
            </div>
            <motion.div
              animate={{ x: isAnimated && !isMobile && isPanel ? 56 : 0 }}
              className="absolute bg-white rounded-full h-7 w-14"
              initial={{ x: 0 }}
              transition={{ duration: 0.2, delay: 1.2 }}
            />
          </div>
        }
        description="Disable the component"
        isPanel={isPanel}
        label="outOfStock"
      />
      <Line control={<Range value={0.6} />} isPanel={isPanel} label="padding" />
      <Line
        control={<Radio />}
        defaultValue="medium"
        description="Size of the prompt"
        isPanel={isPanel}
        label="selectedColor"
      />
    </div>
  );
};

const Line = ({
  label,
  control,
  required = false,
  description,
  defaultValue,
  isPanel = false,
}: {
  label: ReactNode;
  control: ReactNode;
  required?: boolean;
  description?: string;
  defaultValue?: ReactNode;
  isPanel: boolean;
}) => {
  return (
    <div className="flex border-b border-b-[#D9E0E6] py-3">
      <div
        className={cn(
          'flex flex-shrink-0 items-center pl-4 text-[13px]',
          isPanel && 'w-1/2',
          !isPanel && 'w-1/2 md:w-1/4',
        )}
      >
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </div>
      {!isPanel && (
        <>
          <div className="hidden w-[38%] py-2 text-[13px] md:block md:w-1/4">
            {description}
          </div>
          <div className="hidden w-1/4 py-2 text-[13px] lg:flex">
            {defaultValue ? (
              <div className="flex h-5 items-center rounded border border-[#D9E0E6] bg-[#F6F9FC] px-1.5">
                {defaultValue}
              </div>
            ) : (
              '-'
            )}
          </div>
        </>
      )}
      <div
        className={cn(
          'flex w-1/2 pr-4 text-[13px] md:w-1/2',
          isPanel && 'w-1/2',
          !isPanel && 'w-1/2 md:w-1/4',
        )}
      >
        {control}
      </div>
    </div>
  );
};

const Input = ({
  value,
  muted = false,
}: {
  value: string;
  muted?: boolean;
}) => {
  return (
    <div
      className={cn(
        'flex h-7 w-full items-center rounded border border-[#D9E0E6] px-2',
        muted && 'text-[#73828C]',
      )}
    >
      <div className="w-full truncate">{value}</div>
    </div>
  );
};

const Range = ({ value }: { value: number }) => {
  return (
    <div className={cn('flex w-full items-center gap-2')}>
      <div>0</div>
      <div className="relative flex h-1.5 w-full items-center rounded border border-[#D9E0E6] bg-white px-2">
        <div
          className="absolute z-20 -ml-2 h-4 w-4 rounded-full border border-[#D9E0E6] bg-white shadow-md"
          style={{ left: `${(value * 100).toString()}%` }}
        />
        <div
          className="absolute left-0 z-10 h-full bg-blue-500 rounded-full"
          style={{ width: `${(value * 100).toString()}%` }}
        />
      </div>
      <div>40</div>
    </div>
  );
};

const Radio = () => {
  return (
    <div className={cn('flex w-full flex-col gap-2')}>
      {['White', 'Space Grey', 'Yellow'].map((item) => (
        <div className="flex items-center gap-2" key={item}>
          <div
            className={cn(
              'flex h-4 w-4 items-center justify-center rounded-full border border-[#D9E0E6]',
              item === 'White' && 'border border-blue-500',
            )}
          >
            {item === 'White' && (
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
            )}
          </div>
          {item}
        </div>
      ))}
    </div>
  );
};
