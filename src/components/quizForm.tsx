import React, { useState } from 'react';
import { Question } from '@/util/types';
import styles from '@/styles/quizForm.module.css';
import Logo from "@/components/logo"
import createPdf from "@/util/pdf";

type setQuizFunction = (newValue: Question[]) => void;
type setSubjectFunction = (newValue: string) => void;

interface QuizFormProps {
  setQuiz: setQuizFunction;
  setSubject: setSubjectFunction;
  subject: string;
}

/**
 * The form for creating a quiz.
 *
 * @param {setQuizFunction} setQuiz - The function for setting the quiz.
 * @return {*} {JSX.Element} - The form for creating a quiz.
 */
const QuizForm: React.FC<QuizFormProps> = ({ setQuiz, setSubject, subject }) => {
  const [loading, setLoading] = useState(false);
  const isDevelopment = process.env.NODE_ENV === 'development';
  

  /**
   * Handles the form submission event.
   *
   * @param {React.FormEvent<HTMLFormElement>} ev - The form submission event.
   */
  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();

    setLoading(true);
    const data = new FormData(ev.currentTarget);
    // console.log('\n*** [handleSubmit] data:', data);
    const subject = data.get('subject');
    const amount = data.get('amount');
    const json = JSON.stringify({ subject, amount });
    const endpoint = '/api/createQuiz';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    };
    setSubject(subject as string);

    isDevelopment && console.log('\n*** [handleSubmit] \nendpoint:', endpoint, '\njson:', json);
    try {
      const response = await fetch(endpoint, options)
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      isDevelopment && console.log('\n*** [handleSubmit] response:', response);
      const json = await response.json();
      isDevelopment && console.log('\n*** [handleSubmit] json:', json);
      setQuiz(json.response.questions);
      const data = json.response;
      isDevelopment && console.log('\n*** [handleSubmit] data:', data);
    } catch (err) {
      isDevelopment && console.error('\n*** [handleSubmit] error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {
        loading
          ?
          <>
            <p>Loading your quiz about {subject}...</p>
            <div className={`spinner-border text-primary ${styles.loader}`} role="status"><Logo width={60} src={''} alt={''} /></div >
          </>
          :
          <form className="mx-auto" onSubmit={handleSubmit}>
            {/* // <form className="mx-auto" action="/quizResponse" method="POST"> */}
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
            <input type="submit" value="Submit" />
          </form>
      }
    </>
  )
}

export default QuizForm;