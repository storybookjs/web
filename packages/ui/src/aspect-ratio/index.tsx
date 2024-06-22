interface AspectRatioProps {
  children: React.ReactNode;
  /** e.g. `'4/3'` */
  ratio: `${number}/${number}`;
}

const getRatioNumber = (ratio: string): number => {
  const parts = ratio.split('/');
  return parseInt(parts[0], 10) / parseInt(parts[1], 10);
};

export const AspectRatio = (props: AspectRatioProps) => <div {...props} />;
// overflow: hidden;

// @supports (aspect-ratio: 1) {
//   aspect-ratio: ${(props) => props.ratio};

//   & > * {
//     max-width: 100%;
//   }
// }

// @support not (aspect-ratio: 1) {
//   position: relative;
//   width: 100%;
//   height: 0;
//   padding-bottom: ${(props) => getRatioNumber(props.ratio) * 100}%;

//   & > * {
//     position: absolute;
//     width: 100%;
//     height: auto;
//     left: 0;
//     top: 0;
//   }
// }
