import React from 'react';
import Image, { ImageProps } from 'next/image';
import styles from '@/styles/logoName.module.css'

type LogoNameProps = ImageProps & {
  className?: string;
  width?: number;
  height?: number;
}

const LogoName: React.FC<LogoNameProps> = ({className, width, height, ...res}) => {
  const xheight = height || 30;
  const xwidth = width || 160;
  return (
    <Image src="/quizzify-name.svg" className={`${className} ${styles.img}`} alt="Q-AI Logo" width={`${xwidth}`} height={`${xheight}`} priority />
  )
}

export default LogoName