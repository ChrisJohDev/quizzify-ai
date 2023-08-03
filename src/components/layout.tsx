/**
 * Project Name: Quizzify-AI
 *
 * Main layout component
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import React, { ReactElement } from 'react';
import Menu from './menu';
import Footer from './footer';

/**
 * Main layout component.
 *
 * @param { React.ReactNode } children  - React children
 * @returns {ReactElement} - the main layout as React component
 */
const Layout = ({ children }: { children: React.ReactNode }): ReactElement => {
  return (
    <div className="flex-grow flex flex-col">
      <Menu />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
