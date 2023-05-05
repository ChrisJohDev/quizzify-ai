import Image from 'next/image'
import { Inter } from 'next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import styles from '@/styles/quizzes.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Quizzes() {
  return (
    <div className={`container mx-auto flex flex-col flex-fill ${styles.quizPage}`}>
      <h1 className="text-center">Create your quiz</h1>
      <div className="col-md-6 offset-md-3 flex flex-col info">
        <form className="mx-auto" action="/result">
          <label htmlFor="issue">Number of questions:</label>
          <select id="issue" name="amount">
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
            <option value="25">25</option>
          </select>
          <label htmlFor="input-element">Subject:</label>
          <input type="text" id="input-element" name="subject" placeholder='Leave blank for general knowledge' /><br />
          {/* <label for="input-element1">Label Text:</label>
          <textarea  id="input-element1" name="input-name1" /> <br /> */}
          <Link href="/queryResponse" ><input type="submit" value="Submit" /></Link>
        </form>
      </div>
    </div>
  )
}

