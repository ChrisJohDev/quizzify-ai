import React from 'react';
import Image, { ImageProps } from 'next/image';

type LogoNameProps = ImageProps & {
  className?: string;
  width?: number;
  height?: number;
}

const LogoName: React.FC<LogoNameProps> = ({className, width, height}) => {
  const xheight = height || 30;
  const xwidth = width || 160;
  return (
    <Image src="/quizzify-name.png" className={`${className} img`} alt="Q-AI Logo" width={`${xwidth}`} height={`${xheight}`} priority />
  )
}

export default LogoName