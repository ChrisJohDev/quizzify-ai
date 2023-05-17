import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react';
import { Session } from 'next-auth';
import Head from 'next/head'
import Layout from '@/components/layout'
import '@/styles/globals.css'

export default function App({ 
  Component, 
  pageProps: {session, ...pageProps} 
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Head>
        <title>Quizzify-AI</title>
      </Head><Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  )
}
