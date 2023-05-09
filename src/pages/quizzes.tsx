import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/quizzes.module.css'
import QuizForm from '@/components/quizForm'

const inter = Inter({ subsets: ['latin'] })

export default function Quizzes() {
  return (
    <div className={`container mx-auto flex flex-col flex-fill ${styles.quizPage}`}>
      <h1 className="text-center">Create your quiz</h1>
      <div className="col-md-6 offset-md-3 flex flex-col info">
        <QuizForm />
      </div>
    </div>
  )
}

