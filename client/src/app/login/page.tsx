'use client'
import React, { useContext, useEffect, useRef } from 'react'
import {loginCall} from '../api/apicalls'
import { AuthContext } from '../context/AuthContext'
import { IInitialState, IAuthContext } from "../../types/types";
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const page = () => {
    const email = useRef<HTMLInputElement>(null);
    const password = useRef<HTMLInputElement>(null);
    const {user, isFetching, error, dispatch , logout} = useContext<IAuthContext>(AuthContext);
    const handleClick = (e:any) => {
        e.preventDefault();
        console.log(email.current?.value)
        console.log(password.current?.value)
        if (email.current && password.current) {
            loginCall({ email: email.current.value, password: password.current.value }, dispatch);
            // Reset email and password fields
            email.current.value = '';
            password.current.value = '';
        }
    }
    useEffect(() => {
        console.log('User updated:', user);
        console.log('AuthContext:', AuthContext);
      }, [user, AuthContext]);
  return (
    <div className='mt-10' >
    <div className="w-full  max-w-sm mx-auto sticky center-0 overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
    <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="https://merakiui.com/images/logo.svg" alt=""/>
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-600 dark:text-gray-200">  {user ? `Welcome Back ${user.username}` : 'Welcome'}
        </h3>
        {user &&(
        <a href="#" onClick={logout}>
            Logout
          </a>
)}

        <p className="mt-1 text-center text-gray-500 dark:text-gray-400">Login or create account</p>

        <form >
            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="email" placeholder="Email Address" aria-label="Email Address" ref={email}/>
            </div>

            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-blue-300" type="password" placeholder="Password" aria-label="Password" ref={password} />
            </div>

            <div className="flex items-center justify-between mt-4">
                <a href="#" className="text-sm text-gray-600 dark:text-gray-200 hover:text-gray-500">Forget Password?</a>

                <button onClick={handleClick} disabled={isFetching} className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                {isFetching ? <CircularProgress color="inherit" size="10px" /> : 'Login'}
                </button>
            </div>
        </form>
        {error && <span className='text-red-600'>Something went wrong:</span>}

    </div>

    <div className="flex items-center justify-center py-4 text-center bg-gray-50 dark:bg-gray-700">
        <span className="text-sm text-gray-600 dark:text-gray-200">Don't have an account? </span>

        <a href="#" className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline">Register</a>
    </div>
</div>
</div>
  
  )
}

export default page