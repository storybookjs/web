import type { FC, ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions -- With an interface, we get this error in ./index: https://github.com/microsoft/TypeScript/issues/5711
type HrProps = {
  children?: ReactNode;
};

export const Hr: FC<HrProps> = () => {
  return <hr className="ui-my-10" />;
};
