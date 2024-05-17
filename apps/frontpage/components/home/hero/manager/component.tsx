import Image from 'next/image';

export const Component = () => {
  // Create an array of dots with x and y coordinates with random positions between 0 and 120 in width and 0 and 48 in height
  const dots = Array.from({ length: 140 }, (_, i) => ({
    index: i,
    x: Math.floor(Math.random() * 120),
    y: Math.floor(Math.random() * 48),
    opacity: Math.random() - 0.2,
  }));

  return (
    <div className="relative">
      <div className="h-16 bg-[#222448] rounded-full flex items-center justify-between pl-6 pr-2 gap-6 w-[520px] relative z-10">
        <div className="flex items-center flex-shrink-0 gap-3 text-lg font-medium text-white/40">
          <svg
            fill="none"
            height={24}
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M19 11a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm0 0a6 6 0 1 1-12 0 4 4 0 0 1 8 0 2 2 0 0 1-4 0m10 10-4.3-4.3"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            />
          </svg>
          An app for a candy shop
        </div>
        <div className="relative flex items-center justify-center w-32 h-12 overflow-hidden font-medium text-white border rounded-full text-md bg-white/20 border-white/10">
          Generate
          {dots.map((dot) => (
            <div
              className="absolute w-px h-px bg-white rounded-full"
              key={dot.index}
              style={{
                top: `${dot.y}px`,
                left: `${dot.x}px`,
                opacity: dot.opacity,
              }}
            />
          ))}
        </div>
      </div>
      <Image
        alt="Shadows"
        className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
        height={140}
        src="/home/shadows.png"
        width={560}
      />
    </div>
  );
};
