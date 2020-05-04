import React from 'react';

export interface Props {
  color?: string;
  size?: string | number;
}

const Icon: React.FC<Props> = ({ size = 24, color = 'currentColor' }: Props) => {
  return (
    <>
      {size}
      {color}
    </>
  );
};

export default Icon;
