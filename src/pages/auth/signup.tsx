import React from 'react';
import styles from '@/styles/signup.module.css'
import {useState}from 'react';

type Message = {
  head: string;
  body: string;
}

const SignUp = () => {
  const [message, setMessage] = useState<Message>({head: '', body: ''});

  const handleSubmit = async (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const username = data.get('username');
    const firstName = data.get('firstName');
    const lastName = data.get('lastName');
    const email = data.get('email');
    const pword = data.get('pword');
    const confirm_pword = data.get('confirm_pword');

    console.log('\n*** [handleSubmit] username:', username, '\n*** [handleSubmit] firstName:', firstName, '\n*** [handleSubmit] lastName:', lastName, '\n*** [handleSubmit] email:', email, '\n*** [handleSubmit] pword:', pword, '\n*** [handleSubmit] confirm_pword:', confirm_pword);

    const json = JSON.stringify({ username, firstName, lastName, email, pword, confirm_pword });
    const endpoint = '/api/auth/register';
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: json
    };

    try {
      const response = await fetch(endpoint, options);
      // fetch(endpoint, options);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      const data = await response.json();
      if(data){
        setMessage({head:'Your registration was successful', body: 'An email with a verification link has been sent to the email address you supplied. Please, click on the link to verify your email address.'});
        // window.location.href = data.redirect;
      }
    } catch (err) {
      setMessage({head:'Your registration failed', body: 'Please, check your entries and try again.'});
      console.error('\n*** [handleSubmit] error:', err);
    } finally {
      document.querySelector("#message")?.classList.remove("hidden");
    }
  }
  return (
    <div className={`${styles.wrapper} class="container max-w-screen-lg mx-auto flex flex-col`}>
      <h1>Registration Form</h1>
      <div id="message" className={`hidden ${styles.message}`}>
        <h3>{message.head}</h3>
        <p>{message.body}</p>
      </div>
      <form onSubmit={handleSubmit} className="mx=auto">
        <div className={`${styles.nameSection}`}>
          <div className={`${styles.formGroup}`}>
            <label htmlFor="fname">* First Name:</label>
            <input type="text" id="fname" required name="firstName" />
          </div>
          <div className={`${styles.formGroup}`}>
            <label htmlFor="lname">* Last name:</label>
            <input type="text" id="lname" required name="lastName" />
          </div>
        </div>
        <div className={`${styles.dataSection}`}>
          <div className={`${styles.formGroup}`}>
            <label htmlFor="username">Username (min 3 characters start with a letter):</label>
            <input type="text" id="username" name="username" minLength={3} required />
          </div>
          <div className={`${styles.formGroup}`}>
            <label htmlFor="email">* Email:</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className={`${styles.formGroup}`}>
            <label htmlFor="pword">* Password:</label>
            <input type="password" id="pword" name="pword" required />
          </div>
          <div className={`${styles.formGroup}`}>
            <label htmlFor="confirm_pword">* Confirm Password:</label>
            <input type="password" id="confirm_pword" name="confirm_pword" required />
          </div>

        </div>
        <div className={`${styles.buttonSection}`}>
          <input type="submit" value="Submit" />
          <input type="reset" value="Reset Form" />
        </div>

      </form>
    </div>
  )
}

export default SignUp;