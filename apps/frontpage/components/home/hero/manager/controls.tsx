import { cn } from '@repo/utils';
import type { FC, ReactNode } from 'react';
import { motion } from 'framer-motion';

export const Controls: FC<{ isPanel?: boolean }> = ({ isPanel = false }) => {
  return (
    <div>
      <div
        className={cn(
          'bg-[#F7F9FC] h-10 flex items-center px-4 text-[11px] tracking-widest uppercase font-bold text-[#2E3438] border-b border-b-[#D9E0E6]',
          isPanel && 'hidden sm:flex',
        )}
      >
        Props
      </div>
      <Line
        control={<Input value="Space Helmet X24" />}
        description="Button label"
        isPanel={isPanel}
        label="productTitle"
        required
      />
      <Line
        control={
          <div className="relative flex items-center h-8 px-0.5 rounded-full bg-slate-200">
            <div className="relative z-10 flex items-center justify-center h-full w-14">
              False
            </div>
            <div className="relative z-10 flex items-center justify-center h-full w-14">
              True
            </div>
            <motion.div
              animate={{ x: isPanel ? 0 : 56 }}
              className="absolute bg-white rounded-full w-14 h-7"
              initial={{ x: 56 }}
              transition={{ duration: 0.2, delay: 1.2 }}
            />
          </div>
        }
        description="Disable the component"
        isPanel={isPanel}
        label="inStock"
      />
      <Line
        control={
          <div className="border border-[#D9E0E6] rounded w-full h-7 flex items-center px-2 justify-between">
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ backgroundColor: '#485353' }}
                className="w-4 h-4 rounded border border-[#D9E0E6]"
                initial={{ backgroundColor: '#D8DDDD' }}
                transition={{ duration: 0.2, delay: 2.7 }}
              />
              #D8DDDD
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
      <Line control={<Range value={0.6} />} isPanel={isPanel} label="padding" />
      <Line
        control={<Radio />}
        defaultValue="medium"
        description="Size of the prompt"
        isPanel={isPanel}
        label="selectedColor"
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
          'text-[13px] pl-4 flex-shrink-0 flex items-center',
          isPanel && 'w-1/2',
          !isPanel && 'w-1/2 md:w-1/4',
        )}
      >
        {label}
        {required ? <span className="text-red-500">*</span> : null}
      </div>
      {!isPanel && (
        <>
          <div className="text-[13px] w-[38%] md:w-1/4 hidden md:block py-2">
            {description}
          </div>
          <div className="text-[13px] w-1/4 hidden lg:flex py-2">
            {defaultValue ? (
              <div className="bg-[#F6F9FC] border border-[#D9E0E6] h-5 px-1.5 rounded flex items-center">
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
          'text-[13px] w-1/2 md:w-1/2 flex pr-4',
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
        'border border-[#D9E0E6] rounded w-full h-7 flex items-center px-2',
        muted && 'text-[#73828C]',
      )}
    >
      <div className="truncate w-full">{value}</div>
    </div>
  );
};

const Range = ({ value }: { value: number }) => {
  return (
    <div className={cn('w-full flex items-center gap-2')}>
      <div>0</div>
      <div className="relative flex items-center w-full h-1.5 px-2 bg-white border rounded border-[#D9E0E6]">
        <div
          className="absolute z-20 w-4 h-4 -ml-2 bg-white border rounded-full shadow-md border-[#D9E0E6]"
          style={{ left: `${value * 100}%` }}
        />
        <div
          className="absolute left-0 z-10 h-full bg-blue-500 rounded-full"
          style={{ width: `${value * 100}%` }}
        />
      </div>
      <div>40</div>
    </div>
  );
};

const Radio = () => {
  return (
    <div className={cn('w-full flex flex-col gap-2')}>
      {['Pink', 'Space Grey', 'White'].map((item) => (
        <div className="flex items-center gap-2" key={item}>
          <div
            className={cn(
              'w-4 h-4 border rounded-full border-[#D9E0E6] flex items-center justify-center',
              item === 'Space Grey' && 'border border-blue-500',
            )}
          >
            {item === 'Space Grey' && (
              <div className="w-3 h-3 bg-blue-500 rounded-full" />
            )}
          </div>
          {item}
        </div>
      ))}
    </div>
  );
};
