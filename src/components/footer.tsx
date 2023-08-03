/**
 * Project Name: Quizzify-AI
 *
 * Footer component
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */

import { ReactElement } from 'react';
import Logo from './logo';
import styles from '@/styles/footer.module.css';

/**
 * Footer component.
 *
 * @returns {ReactElement}   Visual component
 */
const Footer = (): ReactElement => {
  const year = new Date().getFullYear();

  return (
    <footer className={`mx-auto flex justify-center mt-auto p-3 ${styles.footer}`}>
      <span className="mr-4"><Logo width={30} src={''} alt={''}/></span>
      <p>Copyright &copy; {year} - <span className="companyName keepColor">Quizzify-AI</span> is a product by Chris Johannesson</p>
    </footer>
  );
};

export default Footer;
