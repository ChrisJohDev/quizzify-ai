import React from 'react';
import Image, { ImageProps } from 'next/image';

type LogoNameProps = ImageProps & {
  className?: string;
  width?: number;
  height?: number | any;
}

const LogoName: React.FC<LogoNameProps> = ({className, width, height, ...res}) => {
  const xheight = height || 'auto';
  const xwidth = width || 160;
  return (
    <Image src="/quizzify-name.svg" className={`${className}`} alt="Q-AI Logo" width={`${xwidth}`} height={`${xheight}`} priority />
  )
}

export default LogoName