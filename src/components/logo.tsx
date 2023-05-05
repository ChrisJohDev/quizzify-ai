import React from 'react'
import Image, { ImageProps}  from 'next/image'

type LogoProps = ImageProps & {
  className?: string;
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({className, width, height,  ...res}) => {
  return <Image src="/QAI-Logo.png" className={`${className}`} alt="Q-AI Logo" width={`${width || 50}`} height={`${height || 50}`} priority />
}

export default Logo;
export type { LogoProps }
