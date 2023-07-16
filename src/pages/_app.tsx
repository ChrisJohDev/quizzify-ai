/**
 * Project Name: Quizzify-AI
 *
 * NextJS basic file. This is a top-level component that will be used across the application.
 * This file is often used for initializing page layout, keeping state when navigating between pages,
 * and injecting additional data into pages for server-side rendering.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import { AppProps, AppContext } from 'next/app';
import React from 'react';
import { NextPageContext, NextApiRequest } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Head from 'next/head';
import Layout from '@/components/layout';
import '@/styles/globals.css';

import session from 'express-session';

type AppPropsWithSession = AppProps & {
  session: Session;
};

/**
 * NextJS basic file. This is the root file of the application.
 *
 * @class QuizApp
 * @augments {React.Component<AppPropsWithSession>}
 */
class QuizApp extends React.Component<AppPropsWithSession> {
  /**
   * Get initial props for the application.
   *
   * @param {AppContext} props - The application context.
   * @param {AppContext['Component']} props.Component - The application component.
   * @param {AppContext['ctx']} props.ctx - The application context.
   * @returns {*} - The initial props.
   * @memberof QuizApp - The QuizApp class.
   */
  static async getInitialProps ({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps &&
    (await Component.getInitialProps(ctx as NextPageContext));
    const req = ctx.req as NextApiRequest & { session: session.Session };
    return { pageProps, session: req?.session };
  }

  /**
   * Render the application.
   *
   * @returns {React.ReactElement} - The application.
   */
  render (): React.ReactElement {
    const { Component, pageProps, session } = this.props;
    return (
      <SessionProvider session={session}>
        <Head>
          <title>Quizzify-AI</title>
        </Head>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    );
  }
}

export default QuizApp;
