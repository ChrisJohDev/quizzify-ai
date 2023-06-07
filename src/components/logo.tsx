/**
 * Project Name: Quizzify-AI
 * 
 * Company Logo component
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import React, { ReactElement } from 'react'
import Image from 'next/image'
import { LogoProps } from '@/util/types';


/**
 * Company Logo component
 *
 * @param {LogoProps} {className, width, height}
 * @return {ReactElement} 
 */
const Logo: React.FC<LogoProps> = ({className, width, height}: LogoProps): ReactElement => {
  return <Image src="/QAI-Logo.png" className={`${className}`} alt="Q-AI Logo" width={`${width || 50}`} height={`${height || 50}`} priority />
}

export default Logo;
