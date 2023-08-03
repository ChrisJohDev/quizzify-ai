/**
 * Project Name: Quizzify-AI
 *
 * NextJS basic file. This file is used to augment the application's HTML structure
 * and is usually where any application-wide meta tags would be placed,
 * CSS in JS server side rendering setup, or anything else that needs to directly
 * modify the root HTML document.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import React from 'react';
import { Html, Head, Main, NextScript } from 'next/document';

/**
 * NextJS basic file.
 *
 * @returns {React.ReactElement} - The document.
 */
export default function Document (): React.ReactElement {
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
  );
}
