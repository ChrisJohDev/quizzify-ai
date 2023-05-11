import {useState} from 'react';

const QuizForm = () => {
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
    console.log('\n*** [handleSubmit] data:', data);
    const subject = data.get('subject');
    const amount = data.get('amount');
    const json = JSON.stringify({subject, amount});
    const endpoint ='/api/createQuiz';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    };

    isDevelopment && console.log('\n*** [handleSubmit] endpoint:', endpoint);
    try{
      const response = await fetch(endpoint, options)
      if(!response.ok){
        throw new Error(response.statusText);
      }
      isDevelopment && console.log('\n*** [handleSubmit] response:', response);
      const json = await response.json();
      isDevelopment && console.log('\n*** [handleSubmit] json:', json);
      const data = json.data;
      isDevelopment && console.log('\n*** [handleSubmit] data:', data);
    } catch(err){
      isDevelopment && console.error('\n*** [handleSubmit] error:', err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
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
  )
}

export default QuizForm;