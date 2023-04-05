import React, { useState } from 'react';
import {  useNavigate } from 'react-router-dom'

import { XCircleIcon } from '@heroicons/react/20/solid'

export const LogIn = ({setUser}) => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const [errors, setErrors] = useState([]);

  const navigate = useNavigate()
  function handleChange(e){
    setFormData({
      ...formData,
      [e.target.id] : e.target.value
    })
  }
  function handleSubmit(e) {
    e.preventDefault();
    const loginObj = {
      email: formData.email,
      password: formData.password
    }

    // reset errors 
    setErrors([]);

    fetch("/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginObj),
    })
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
          // redirect to projects page
        navigate("/admin")
          setUser(user)
        })
      } 
      else {
        r.json()
        .then((err) => setErrors(err.errors));
      }
    });

    // reset formData
    setFormData({
      email: "",
      password: ""
    })
  }
  return (
    <div className='m-0 p-5'>
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">Sign in</h2>
          
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    onChange={handleChange}
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    onChange={handleChange}
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
              <button
                  className="button flex w-full justify-center rounded border border-transparent py-2 px-4 text-sm font-medium text-white shadow-sm "
                >
                  Sign in
                </button>
              </div>
              {/* Alert for Displaying Tracking Errors */}
      { errors.length > 0 &&
        <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">There were {errors.length} error(s) with your submission</h3>
            <div className="mt-2 text-sm text-red-700">
              <ul className="list-disc space-y-1 pl-5">
                {errors.map((error) => (
                  <li>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    }
            </form>
          </div>
        </div> 
    </div>
    </div>
  );
};

export default LogIn;

