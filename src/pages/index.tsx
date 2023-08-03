/**
 * Project Name: Quizzify-AI
 *
 * Home page.
 *
 * @author Chris Johannesson <chris@chrisjohannesson.com>
 * @version 1.0.0 - release
 */
import React from 'react';
// import { useSession } from 'next-auth/react';
import Head from 'next/head';
import styles from '@/styles/home.module.css';

/**
 * Home page.
 *
 * @returns {React.ReactElement} - The home page.
 */
const Home: React.FC = (): React.ReactElement => {
  // const {data: session, status } = useSession();

  // console.log('\n*** [Home] session:', session, '\n*** [Home] status:', status);
  // console.log('\n*** [Home] name:', session?.token?.token?.name);
  return (
    <>
      <Head>
        <style>
          .mainLogo: ${styles.mainLogo}
        </style>
      </Head>
      <div className="container max-w-screen-lg md:mx-auto flex flex-col items-center home-page">
        <h1 className="companyName homePageLogoText">Quizzify-AI</h1>
        {/* <p className={`text-center text-lg ${styles.home_p}`}><span className="companyName keepColor">Quizzify-AI</span> the number one stop for custom quizzes!</p> */}
        {/* <Logo className="mainLogo mx-auto mt-8" width={500} src={''} alt={''} /> */}
        <h3 className={`text-center ${styles.home_p} ${styles.home_h3}`}>Welcome to <span className="companyName keepColor">Quizzify-AI</span> - Your One-Stop Solution for Effortless Quiz Creation and Enjoyment!</h3>
        <p className={`${styles.home_p}`}>At Quizzify-AI, we are revolutionizing the way quizzes are made and played. We&rsquo;re on a mission to make quizzing a more enjoyable and accessible activity for everyone. With our AI-powered quiz platform, creating engaging quizzes has never been easier!</p>
        <p className={`${styles.home_p}`}>With Quizzify-AI, you can:</p>
        <ul className={`${styles.home_p} ${styles.home_ul}`}>
          <li>
            <p>
              <strong>Create Engaging Quizzes Effortlessly:</strong> Our AI-powered engine simplifies the quiz creation process, giving you access to a vast database of questions across a variety of categories.
            </p>
          </li>
        </ul>
        <p className={`${styles.home_p}`}>As the <span className="companyName">Quizzify-AI</span> platform evolves you will be able to:</p>
        <ul className={`${styles.home_p} ${styles.home_ul}`}>
          <li>
            <p>
              <strong>Enjoy Quizzes Online:</strong> Participate in exciting online quizzes tailored to your interests. Enjoy a user-friendly interface, personalized leaderboards, and a broad selection of categories.
            </p>
          </li>
          <li>
            <p>
              <strong>Customize Your Quizzes:</strong> With our platform, not only can you create quizzes, but you can also customize them. Add your own questions and categories to make the quiz truly yours!
            </p>
          </li>
          <li>
            <p>
              <strong>Share Your Quizzes Widely: </strong><span className="companyName">Quizzify-AI&rsquo;s</span> quizzes are public domain. Share your creativity with other Quiz Masters and reach a wider audience.
            </p>
          </li>
        </ul>
        <p className={`${styles.home_p}`}>
          Join us on our journey to bring quizzing into the digital age!
        </p>
      </div>
    </>
  );
};

export default Home;
