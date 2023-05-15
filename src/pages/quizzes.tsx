import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/quizzes.module.css'
import QuizForm from '@/components/quizForm'
import { useState } from 'react'
import { Question } from '@/util/types';
import QuizQuestions from '@/components/quizQuestions';

const inter = Inter({ subsets: ['latin'] })

const Quizzes: React.FC = () => {
  const [quiz, setQuiz] = useState<Question[]>([]);
  const [subject, setSubject]= useState<string>('');

  return (
    <div className={`container mx-auto flex flex-col flex-fill items-center ${styles.quizPage}`}>
      {
        quiz.length < 1
          ? <>
            <h1 className="text-center">Create your quiz</h1><div className="col-md-6 offset-md-3 flex flex-col info">
              <QuizForm setQuiz={setQuiz} setSubject={setSubject} subject={subject} />
            </div>
          </>
          : <>
            <h1 className="text-center">Your quiz on the subject of {subject}</h1>
            <QuizQuestions quiz={quiz} subject={subject} />
          </>
      }
    </div>
  )
}

export default Quizzes;

