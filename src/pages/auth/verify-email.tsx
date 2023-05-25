import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from 'next/types';
import { ParsedUrlQuery } from 'querystring';
import Link from 'next/link';
import { useEffect } from 'react';
import { userSchema } from '@/util/model/user';
import mongoose from 'mongoose';

const isDevelopment = true;

interface Props {
  ok: boolean
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context: GetServerSidePropsContext<ParsedUrlQuery>
): Promise<GetServerSidePropsResult<Props>> => {
  isDevelopment && console.log('\n*** [verify-email-getServerSideProps] -');
  const { token, id } = context.query;
  isDevelopment && console.log('\n*** [verify-email-getServerSideProps] token:', token, '\n*** [verify-email-getServerSideProps] id:', id);
  try {
    const UserLocal = mongoose.models.User || mongoose.model('User', userSchema);
    const user = await UserLocal.findOne({ verificationToken: token });
    isDevelopment && console.log('\n*** [verify-email-getServerSideProps] user:', user);
    if (user && user.guid === id) {
      isDevelopment && console.log('\n*** [verify-email-getServerSideProps] user:', user.guid, '\n*** [verify-email-getServerSideProps] id:', id);
      user.verified = true;
      user.verificationToken = '';
      const response = await UserLocal.findOneAndUpdate({ guid: user.guid}, { isVerified: true, verificationToken: '' }, {new: true});
      isDevelopment && console.log('\n*** [verify-email-getServerSideProps] response.isVerified:', response.isVerified);
      if (response.isVerified) {
        return { props: { ok: true } };
      }
    }
  } catch (err) {
    console.error('\n*** [verify-email-getServerSideProps] error:', err);
  }
  return { props: { ok: false } };
}

const VerifyEmails = ({ ok }: Props) => {
  console.log('\n*** [verify-email-handler] - ok:', ok);
  useEffect(() => {
    if (ok) {
      setTimeout(() => {
        window.location.href = '/api/auth/signin';
      }, 5000);
    }
  }, [ok]);

  return (
    <div>
      <h1>Verify Email</h1>
      {ok
        ? <div>
          <p>Your email has been verified.</p>
          <p>You will be redirected to the login page in 5 seconds.</p>
          <p>If you are not redirected, please click <Link href="/api/auth/signin">here</Link>.</p>
        </div>
        : <p>Sorry, your email could not be verified.</p>}
    </div>
  );
};

export default VerifyEmails;

