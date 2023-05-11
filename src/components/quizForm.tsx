import {useState} from 'react';

const QuizForm = () => {
//   const [loading, setLoading] = useState(false);
//   const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
//     ev.preventDefault();
    
//     setLoading(true);
//     const data = new FormData(ev.currentTarget);
//     console.log('\n*** [handleSubmit] data:', data);
//     const subject = data.get('subject');
//     const amount = data.get('amount');
//     const json = JSON.stringify({subject, amount});
//     const endpoint ='/quizResponse';
//     const options = {
//       method: 'GET',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: json
//     };

//     console.log('\n*** [handleSubmit] endpoint:', endpoint);
//     try{
//       const response = await fetch(endpoint, options)
//       if(!response.ok){
//         throw new Error(response.statusText);
//       }
//       console.log('\n*** [handleSubmit] response:', response);
//     } catch(err){
//       console.error(err);
//     } finally {
//       // setLoading(false);
//     }
//   };

  return (
    // <form className="mx-auto" onSubmit={handleSubmit}>
    <form className="mx-auto" action="/quizResponse" method="POST">
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