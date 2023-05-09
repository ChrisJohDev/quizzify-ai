import React from 'react';
import Head from 'next/head';
import fs from 'fs';
import path from 'path';
import Logo from '@/components/logo';
import LogoName from '@/components/logoName';
import styles from '@/styles/home.module.css'

const Home: React.FC = () => {
  return (
    <>
      <Head>
        <style>
          .mainLogo: ${styles.mainLogo}
        </style>
      </Head>
      <div className="container max-w-screen-lg md:mx-auto flex flex-col home-page">
        <LogoName className="mx-auto mt-8 mb-8" width={500} height={'auto'} src={''} alt={''} />
        <p className={`text-center text-lg ${styles.home_p}`}>Quizzify-AI the number one stop for custom quizzes!</p>
        <Logo className="mainLogo mx-auto mt-8" width={500} src={''} alt={''} />
      </div>
    </>
  )
}

export default Home;