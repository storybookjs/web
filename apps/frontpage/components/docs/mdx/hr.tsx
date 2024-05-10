import type { FC, ReactNode } from 'react';

interface HrProps {
  children?: ReactNode;
}

export const Hr: FC<HrProps> = () => {
  return <hr className="my-10" />;
};
