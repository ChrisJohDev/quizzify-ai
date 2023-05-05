import React from 'react';
import Image, { ImageProps } from 'next/image';

type LogoNameProps = ImageProps & {
  className?: string;
  width?: number;
  height?: number;
}

const LogoName: React.FC<LogoNameProps> = ({className, width, height, ...res}) => {
  return (
    <Image src="/quizzify-name.svg" className={`${className}`} alt="Q-AI Logo" width={`${width || 160}`} height={`${height || 30}`} priority />
  )
}

export default LogoName