import { FC } from "react";

export const GradientBackdrop: FC = () => {
  return (
    <svg
      viewBox="0 0 1200 682"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute top-0 left-0 w-full h-full z-0"
      preserveAspectRatio="none"
    >
      <g clipPath="url(#a)">
        <path fill="#fff" d="M0 0h1200v682H0z" />
        <circle cx="-299.5" cy="939.5" r="915.5" fill="url(#b)" />
        <circle cx="-299.5" cy="-22.5" r="915.5" fill="url(#c)" />
        <circle cx="599.5" cy="-22.5" r="915.5" fill="url(#d)" />
        <circle cx="599.5" cy="939.5" r="915.5" fill="url(#e)" />
        <circle cx="1499.5" cy="-22.5" r="915.5" fill="url(#f)" />
        <circle cx="1499.5" cy="939.5" r="915.5" fill="url(#g)" />
      </g>
      <defs>
        <radialGradient
          id="b"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90 -619.5 320) scale(915.5)"
        >
          <stop stopColor="#F77" />
          <stop offset="1" stopColor="#F77" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="c"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90 -138.5 -161) scale(915.5)"
        >
          <stop stopColor="#FFC077" />
          <stop offset="1" stopColor="#FFC077" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="d"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90 311 288.5) scale(915.5)"
        >
          <stop stopColor="#FDFF93" />
          <stop offset="1" stopColor="#FDFF93" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="e"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90 -170 769.5) scale(915.5)"
        >
          <stop stopColor="#FDFF93" />
          <stop offset="1" stopColor="#FDFF93" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="f"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90 761 738.5) scale(915.5)"
        >
          <stop stopColor="#FF778F" />
          <stop offset="1" stopColor="#FF778F" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id="g"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="rotate(90 280 1219.5) scale(915.5)"
        >
          <stop stopColor="#77FFF7" />
          <stop offset="1" stopColor="#77FFF7" stopOpacity="0" />
        </radialGradient>
        <clipPath id="a">
          <path fill="#fff" d="M0 0h1200v682H0z" />
        </clipPath>
      </defs>
    </svg>
  );
};
