import { AppProps, AppContext } from 'next/app';
import React from 'react';
import { NextPageContext } from 'next';
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Head from 'next/head'
import Layout from '@/components/layout'
import '@/styles/globals.css'
import connectDb from '@/util/db/db';
import { NextApiRequest } from 'next';
import session from 'express-session';

// export default function App({ 
//   Component, 
//   pageProps: {session, ...pageProps} 
// }: AppProps<{ session: Session }>) {
//   return (
//     <SessionProvider session={session}>
//       <Head>
//         <title>Quizzify-AI</title>
//       </Head>
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     </SessionProvider>
//   )
// }

type AppPropsWithSession = AppProps & {
  session: Session;
};

class QuizApp extends React.Component<AppPropsWithSession> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    await connectDb();
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
