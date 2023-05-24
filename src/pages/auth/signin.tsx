import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react"
import { getServerSession } from "next-auth/next"
import { authOptions } from "../api/auth/[...nextauth]";
import styles from '@/styles/signin.module.css'

export default function SignIn({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  console.log('\n*** [signin] providers:', providers);
  console.log('\n*** [signin] signIn:', signIn)
  return (
    <div className={`${styles.wrapper}`}>
      {Object.values(providers).map((provider) => (
        <div key={provider.name} >
          {/* <p key={provider.name}>*** [signin] provider: {JSON.stringify(provider)}</p> */}
          {provider.id === 'credentials'
            ? <div>
              <form method="post" action="/api/auth/callback/credentials">
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
            :
            <div>
              <button onClick={() => signIn(provider.id)}>
                Sign in with {provider.name}
              </button>
            </div>
          }
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  }
}