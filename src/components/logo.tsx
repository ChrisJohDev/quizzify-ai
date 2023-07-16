/**
 * Project Name: Quizzify-AI
 *
 * Company Logo component
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import React, { ReactElement } from 'react';
import Image from 'next/image';
import { LogoProps } from '@/util/types';

/**
 * Company Logo component.
 *
 * @param {object} props - The component props.
 * @param {string} props.className - The class name.
 * @param {number} props.width - The width.
 * @param {number} props.height - The height.
 * @returns {ReactElement} - The company logo component.
 */
const Logo: React.FC<LogoProps> = ({ className, width, height }: LogoProps): ReactElement => {
  return <Image src="/QAI-Logo.png" className={`${className}`} alt="Q-AI Logo" width={`${width || 50}`} height={`${height || 50}`} priority />;
};

export default Logo;
