import React, { useState} from 'react';
import { useSession } from 'next-auth/react';
import { IUser } from '@/util/types';
import styles from '@/styles/profile.module.css';

const Profile: React.FC = () => {
  const { data: session } = useSession<boolean>();
  const user: IUser | undefined = session?.user as IUser;
  console.log('\n*** [profile] user:', user);
  const [firstName, setFirstName] = useState<string | undefined>(user?.firstName);
  const [lastName, setLastName] = useState<string | undefined>(user?.lastName);
  const [email, setEmail] = useState<string | undefined>(user?.email);
  const [firstNameOriginal,] = useState<string>(user?.password);
  const [lastNameOriginal,] = useState<string>(user?.password);
  const [emailOriginal,] = useState<string>(user?.password);
  const [updateResponse, setUpdateResponse] = useState<string>('');

  const resetHandler = (): void => {
    setFirstName(firstNameOriginal);
    setLastName(lastNameOriginal);
    setEmail(emailOriginal);
    setUpdateResponse('');
    const elem: HTMLElement | null = document.querySelector('#profileMessage');
    (elem && (elem.setAttribute('style','min-height: 2rem; padding: 0.2rem 0.5rem; border-radius: 0.2rem;' )));
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const resUser: IUser = {
      id: user?.id as string,
      firstName: firstName,
      lastName: lastName,
      email: email,
      guid: user?.guid as string,
    };

    try {
      const res = await fetch('/api/auth/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(resUser)
      });

      console.log('\n*** [profile] res:', res);
      const elem: HTMLElement | null = document.querySelector('#profileMessage');
      (elem && (elem.style.backgroundColor = 'gainsboro'));
      (elem && (elem.style.boxShadow = '0 0 1rem rgb(0 0 0 / 25%)'));

      if (res.status > 199 && res.status < 300) {
        (elem && (elem.style.color = 'green'));
        
        setUpdateResponse('Profile updated successfully.');
      }
      else {
        (elem && (elem.style.color = 'red'));
        setUpdateResponse('Profile update failed.');
      }
    } catch (err) {
      console.error('\n*** [profile] error:');
    }
    
  }

  return (
    <div style={{ color: 'black' }} className={`${styles.wrapper}`}>
      <h1 style={{ fontSize: '3rem', fontWeight: '700' }}>Profile</h1>
      <div className={`${styles.profileMessage}`}>
        <p id="profileMessage" >{updateResponse}</p>
      </div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="firstName">First Name:</label>
          <input type="text" id="firstName" name="firstName" value={firstName} onChange={(ev) => setFirstName(ev.target.value)} />
        </div>
        <div>
          <label htmlFor="lastName">Last Name:</label>
          <input type="text" id="lastName" name="lastName" value={lastName} onChange={(ev) => setLastName(ev.target.value)} />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" value={email} onChange={(ev) => setEmail(ev.target.value)} />
        </div>
        <div className="flex justify-between mt-4">
          <button className="submit" type="submit">Update</button>
          <button className="reset" type="reset" onClick={resetHandler}>Reset</button>
        </div>

      </form>
    </div>
  );
};

export default Profile;