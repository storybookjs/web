import type { FC } from 'react';

export const SearchIcon: FC = () => {
  return (
    <svg
      aria-label="search"
      className="w-10 h-10"
      role="img"
      viewBox="0 0 48 48"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <rect
          fill="#FFD476"
          height="6"
          rx="3"
          transform="rotate(-135 36.898 37.912)"
          width="21.302"
          x="26.247"
          y="34.912"
         />
        <path
          d="M20.782 2.127c10.371 0 18.78 8.408 18.78 18.78 0 10.371-8.409 18.78-18.78 18.78-10.372 0-18.78-8.409-18.78-18.78 0-10.372 8.408-18.78 18.78-18.78Zm0 5.938c-7.093 0-12.842 5.75-12.842 12.842 0 7.092 5.75 12.842 12.842 12.842 7.092 0 12.842-5.75 12.842-12.842 0-7.093-5.75-12.842-12.842-12.842Z"
          fill="#FFC445"
         />
      </g>
    </svg>
  );
};
