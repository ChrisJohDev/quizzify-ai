import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import styles from '@/styles/about.module.css'
const inter = Inter({ subsets: ['latin'] })

export default function About() {
  return (
    <div className={`container max-w-screen-lg mx-auto flex flex-col ${styles.aboutPage}`}>
      <h1 className={`text-center ${styles.headline}`}>Quizzify-AI the Story</h1>
      <p className={styles.paragraph}>
        In 2017, a group of students at a small university had an idea for a new
        way to take quizzes. They envisioned a system that could understand the
        nuances of language and respond to questions in a way that was more
        natural and conversational. With this idea in mind, they set out to
        create Quizzify-AI, a revolutionary new platform that would change the
        way people take quizzes forever.
      </p>
      <p className={styles.paragraph}>
        At first, Quizzify-AI was just a small project, created by a group of
        friends who were passionate about artificial intelligence and natural
        language processing. They worked tirelessly, spending countless hours
        coding and testing their algorithms to create a system that was truly
        intelligent. And it paid off – soon, Quizzify-AI was attracting
        attention from all over the world.
      </p>
      <p className={styles.paragraph}>
        As the platform gained popularity, the team behind Quizzify-AI realized
        that they had created something truly special. They began to explore new
        markets and expand their offerings, creating new features and improving
        their algorithms to make the system even more accurate and reliable.
        Before long, Quizzify-AI had become a major player in the artificial
        intelligence quizz market.
      </p>
      <p className={styles.paragraph}>
        Today, Quizzify-AI is used by millions of people around the world. Its
        natural language processing algorithms are some of the most advanced in
        the industry, and its ability to understand the nuances of language is
        unparalleled. From students to professionals, Quizzify-AI has become the
        go-to platform for anyone looking to take quizzes in a more natural,
        conversational way.
      </p>
      <p className={styles.paragraph}>
        But despite its success, Quizzify-AI remains true to its roots. The team
        behind the platform is still composed of passionate students and
        professionals who are committed to advancing the field of artificial
        intelligence. They continue to work tirelessly, pushing the boundaries
        of what is possible and creating new ways to make the world a smarter,
        more connected place.
      </p>
      <p className={styles.paragraph}>
        In conclusion, Quizzify-AI is a testament to the power of innovation and
        hard work. What started as a small student project has become a major
        player in the artificial intelligence quizz market, changing the way
        people take quizzes and learn about the world around them. As the
        platform continues to grow and evolve, there is no doubt that it will
        continue to make a lasting impact on the world of artificial
        intelligence and beyond.
      </p>
    </div>
  );
}