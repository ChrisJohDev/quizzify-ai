import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="description" content="A quiz app" />
        <meta name="author" content="Chris Johannesson" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
