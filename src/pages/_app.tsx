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
import { NextPageContext } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Head from 'next/head'
import Layout from '@/components/layout'
import '@/styles/globals.css'
import { NextApiRequest } from 'next';
import session from 'express-session';

type AppPropsWithSession = AppProps & {
  session: Session;
};

/**
 * NextJS basic file. This is the root file of the application.
 *
 * @class QuizApp
 * @extends {React.Component<AppPropsWithSession>}
 */
class QuizApp extends React.Component<AppPropsWithSession> {
  /**
   * Get initial props for the application.
   *
   * @static
   * @param {AppContext} { Component, ctx }
   * @return {*} 
   * @memberof QuizApp
   */
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps && 
    (await Component.getInitialProps(ctx as NextPageContext));
    const req = ctx.req as NextApiRequest & { session: session.Session };
    return { pageProps, session: req?.session };
  }

  render() {
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
