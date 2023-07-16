/**
 * Project Name: Quizzify-AI
 *
 * Signin/Login page.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import React from 'react';
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { getCsrfToken, getProviders, signIn } from 'next-auth/react';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]';
import styles from '@/styles/signin.module.css';
import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 *
 *
 * @export
 * @param {InferGetServerSidePropsType<typeof getServerSideProps>} { providers, csrfToken }
 * @returns {React.ReactElement}
 */
export default function SignIn ({ providers, csrfToken }: InferGetServerSidePropsType<typeof getServerSideProps>): React.ReactElement {
  console.log('\n*** [signin] providers:', providers);
  console.log('\n*** [signin] signIn:', signIn);
  const router = useRouter();
  const { query } = router;
  const isError = !!query.error;
  console.log('\n*** [signin] query:', query);

  return (
    <div className={`${styles.wrapper}`}>
      {isError
        ? <div className={`${styles.signinError}`}><div><h3>Sign in failed.</h3><p>Check your entries and try again.</p></div></div>
        : null
      }
      {Object.values(providers).map((provider) => (
        <div key={provider.name} >
          {/* <p key={provider.name}>*** [signin] provider: {JSON.stringify(provider)}</p> */}
          {provider.id === 'credentials'
            ? <div>
              <form method="post" action="/api/auth/callback/credentials">
                <input name='csrfToken' type='hidden' defaultValue={csrfToken} />
                <div>
                  <label>
                    Email:<br />
                    <input type="email" id="email" name="email" placeholder="john.doe@example.com" />
                  </label>
                </div>
                <div>
                  <label>
                    Password:<br />
                    <input type="password" id="password" name="password" />
                  </label>
                </div>
                <div>
                  <button type="submit">Sign in with Email</button>
                </div>
              </form>
              <hr />
            </div>
            : <div>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          }
        </div>
      ))}
      <div>
        <p>Don&rsquo;t have an account? Sign up <Link href="/auth/signup">here</Link>!</p>
      </div>
    </div>
  );
}

/**
 *
 * @param context
 */
export async function getServerSideProps (context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  const csrfToken = await getCsrfToken(context);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: '/' } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [], csrfToken }
  };
}
