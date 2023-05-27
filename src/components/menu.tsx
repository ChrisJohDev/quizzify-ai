import Script from 'next/script'
import Logo from './logo'
import Link from 'next/link';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { BsFillPersonFill } from "react-icons/bs";
import styles from '@/styles/menu.module.css';



const Menu = () => {
  const [active, setActive] = useState(false);
  const [showDropdownMenu, setShowDropdownMenu] = useState(false);
  const handleClick = () => {
    setActive(!active);
  };

  const { data: session } = useSession();

  return (
    <nav className="bg-transparent border-gray-200 dark:bg-transparent">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center homeClickable" onClick={(ev) => {
          ev.preventDefault();
          window.location.href = '/';
        }}>
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-8"><Logo width={60} height={60} src={''} alt={''} /></span>
          {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white ml-8"><LogoName className={''} src={''} alt={''} /></span> */}
          <span className="self-center text-2xl ml-8 companyName">Quizzify-AI</span>
        </div>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" onClick={() => handleClick()}>
          <span className="sr-only">Open main menu</span>
          <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg>
        </button>
        <div className={`${active ? '' : 'hidden'} w-full md:block md:w-auto`} id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 bg-transparent md:flex-row md:space-x-8 md:mt-0">
            <li>
              <Link href="/" className="block py-2 pl-3 pr-4 text-gray-900 bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white">Home</Link>
            </li>
            <li>
              <Link href="/about" className="block py-2 pl-3 pr-4 text-gray-900 bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white">About</Link>
            </li>
            <li>
              <Link href="/quizzes" className="block py-2 pl-3 pr-4 text-gray-900 bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white">Quizzes</Link>
            </li>
            <li>
              <Link href="#" className="block py-2 pl-3 pr-4 text-gray-900 bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white">Pricing</Link>
            </li>
            <li>
              <Link href="/contact" className="block py-2 pl-3 pr-4 text-gray-900 bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:text-white">Contact</Link>
            </li>
            <li className="nav-item dropdown">
              <div className="md:ml-6 text-[#d6ecff]">{
                session
                  ?
                  <>
                    <Link className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button"
                      data-mdb-toggle="dropdown" aria-expanded="false" onClick={() => setShowDropdownMenu(!showDropdownMenu)}>
                      <BsFillPersonFill className="inline-block" size={30} />
                    </Link>
                    <ul className={`${styles.dropdownMenu}`} style={{display: showDropdownMenu ? 'block' : 'none'}} aria-labelledby="navbarDropdownMenuLink">
                      <li>
                        <Link className="dropdown-item" href="/auth/profile" onClick={() => setShowDropdownMenu(!showDropdownMenu)}>Profile</Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" href="/api/auth/signout" onClick={() => setShowDropdownMenu(!showDropdownMenu)}>Log Out</Link>
                      </li>
                    </ul>
                  </>
                  : <Link href="/api/auth/signin" rel="prefetch">Login</Link>
              }
              </div>
            </li>
          </ul>
        </div>
      </div>
      <Script src="https://cdn.tailwindcss.com"></Script>
    </nav>
  )
}

export default Menu;
