import React, { useState, useEffect, useRef } from 'react';
import { Questions } from '@/util/types';
import Loading from './loading';
import styles from '@/styles/quizForm.module.css';
// import { set } from 'mongoose';

const isDevelopment = process.env.NODE_ENV === 'development';

// eslint-disable-next-line no-unused-vars
type setQuizFunction = (newValue: Questions) => void;
// eslint-disable-next-line no-unused-vars
type setSubjectFunction = (newValue: string) => void;
// eslint-disable-next-line no-unused-vars
type setMultiChoiceFunction = (newValue: boolean) => void;

interface QuizFormProps {
  setQuiz: setQuizFunction;
  setSubject: setSubjectFunction;
  setMultiChoice: setMultiChoiceFunction;
  subject: string;
}

/**
 * The form for creating a quiz.
 *
 * @param {setQuizFunction} setQuiz - The function for setting the quiz.
 * @return {*} {JSX.Element} - The form for creating a quiz.
 */
const QuizForm: React.FC<QuizFormProps> = ({ setQuiz, setSubject, setMultiChoice, subject }) => {
  const [loading, setLoading] = useState(false);
  const [isMultiChoice, setIsMultiChoice] = useState(false);
  const checkElem = useRef<HTMLInputElement>(null);
  const subjectField = useRef<HTMLInputElement>(null);
  const selectAmount = useRef<HTMLSelectElement>(null);
  const selectNumbChoices = useRef<HTMLSelectElement>(null);

  useEffect(() => {
    checkElem.current?.focus();
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

    isDevelopment && console.log('\n*** [quizForm - handleSubmit] data:', data);

    const subject = data.get('subject');
    const multiChoice = (data.get('multiChoice') === 'on') as boolean;
    const numbOfMultiChoice = Number(data.get('numbOfMultiChoice'));
    const amount = !multiChoice ? data.get('amount'): 10;

    isDevelopment && console.log('\n*** [quizForm - handleSubmit] subject:', subject, '\namount:', amount, '\nmultiChoice:', multiChoice, '\nnumbOfMultiChoice:', numbOfMultiChoice);

    const json = JSON.stringify({ subject, amount, multiChoice, numbOfMultiChoice });
    const endpoint = '/api/createQuiz';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    };
    setSubject(subject as string || 'General knowledge');
    setMultiChoice(multiChoice);

    isDevelopment && console.log('\n*** [quizForm - handleSubmit] sending data -\nendpoint:', endpoint, '\njson:', json);

    try {
      const response = await fetch(endpoint, options)
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      isDevelopment && console.log('\n*** [quizForm - handleSubmit] response:', response);
      const json = await response.json();
      isDevelopment && console.log('\n*** [quizForm - handleSubmit] json:', json);
      setQuiz(json.response.questions);
      const data = json.response;
      isDevelopment && console.log('\n*** [quizForm - handleSubmit] data:', data);
    } catch (err) {
      isDevelopment && console.error('\n*** [quizForm - handleSubmit] error:', err);
    } finally {
      setLoading(false);
    }
  };

  

  const handleReset = (ev: React.MouseEvent<HTMLInputElement, MouseEvent>): void => {
    ev.preventDefault();
    checkElem.current && (checkElem.current.checked = false);
    setIsMultiChoice(false);
    subjectField.current && (subjectField.current.value = '');
    selectAmount.current && (selectAmount.current.value = '10');
    selectNumbChoices.current && (selectNumbChoices.current.value = '3');
    checkElem.current && (checkElem.current.focus());
  }

  return (
    <>
      {
        loading
          ?
          <Loading text={`Loading your quiz about ${subject || 'General knowledge'}...`} />
          :
          <form className={`mx-auto ${styles.queryForm}`} onSubmit={handleSubmit}>
            <div className="multiChoice">
              <label htmlFor="multiChoice">Multiple choice questions:&nbsp;&nbsp;
                <input 
                type="checkbox" 
                id="multiChoice" 
                name="multiChoice" 
                ref={checkElem}
                onChange={(ev) => {
                  setIsMultiChoice(ev.target.checked)
                  // Temporary fix while we fix the problem with time outs
                  selectAmount.current && (selectAmount.current.value = '10');  
                }}
                />
              </label>
              <div className="numberOfQuestions" >
                <label htmlFor="numbOfMultiChoice">Number of choices:</label>
                <select id="numbOfMultiChoice" name="numbOfMultiChoice" disabled={!isMultiChoice} ref={selectNumbChoices}>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </div>
            </div>
            <div className="numberOfQuestions">
              <label htmlFor="issue">Number of questions:</label>
              <select id="issue" name="amount" disabled={isMultiChoice} ref={selectAmount}>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="20">20</option>
                <option value="25">25</option>
              </select>
            </div>
            <div className="subjectInput">
              <label htmlFor="subjectText">Subject:</label>
              <input 
              type="text" 
              className={`${styles.subjectInput}`} 
              id="subjectText" 
              name="subject" 
              ref={subjectField}
              placeholder='Leave blank for general knowledge' 
              />
            </div>
            <div className={`${styles.buttons}`}>
              <input type="submit" value="Submit" />
              <input type="reset" value="Reset" onClick={handleReset} />
            </div>
          </form>
      }
    </>
  )
}

export default QuizForm;