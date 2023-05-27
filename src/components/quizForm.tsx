import React, { useState, useEffect, useRef } from 'react';
import { Questions } from '@/util/types';
import Loading from './loading';
import styles from '@/styles/quizForm.module.css';

// eslint-disable-next-line no-unused-vars
type setQuizFunction = (newValue: Questions) => void;
// eslint-disable-next-line no-unused-vars
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
  const selectElem = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    selectElem.current?.focus();
  }, [])



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
    setSubject(subject as string || 'General knowledge');

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
          <Loading text={`Loading your quiz about ${subject || 'General knowledge'}...`} />
          :
          <form className={`mx-auto ${styles.queryForm}`} onSubmit={handleSubmit}>
            {/* // <form className="mx-auto" action="/quizResponse" method="POST"> */}
            <label htmlFor="issue">Number of questions:</label>
            <select id="issue" name="amount" ref={selectElem} >
              <option value="10">10</option>
              <option value="15">15</option>
              <option value="20">20</option>
              <option value="25">25</option>
            </select>
            <label htmlFor="subjectText">Subject:</label>
            <input type="text" className={`${styles.subjectInput}`} id="subjectText" name="subject" placeholder='Leave blank for general knowledge' /><br />
            <input type="submit" value="Submit"  />
          </form>
      }
    </>
  )
}

export default QuizForm;