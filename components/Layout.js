import React, { useContext } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { logout } from '../lib/auth';
import AppContext from '../context/AppContext';

export default function Layout(props) {
  const { user, setUser } = useContext(AppContext);

  const title = 'Welcome!';
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className="bg-black h-16 w-full flex justify-between items-center mb-2">
        <h1 className="text-white p-4 font-bold tracking-wider text-lg uppercase text-left">
          Welcome to the Beer House
        </h1>
        <div>
          {' '}
          <a
            href="/"
            className="text-white uppercase text-right m-4 tracking-wider bg-gray-700 p-2 rounded shadow hover:bg-gray-800 hover:pointer hover:opacity-75 transition duration-300 ease-in-out"
          >
            Home
          </a>
          <a
            href="/"
            className="text-white uppercase text-right m-4 tracking-wider bg-gray-700 p-2 rounded shadow hover:bg-gray-800 hover:pointer hover:opacity-75 transition duration-300 ease-in-out"
          >
            Order
          </a>
          {user ? (
            <Link href="/">
              <a
                className="text-white uppercase text-right m-4 tracking-wider bg-red-700 p-2 rounded shadow hover:bg-red-800 hover:pointer hover:opacity-75 transition duration-300 ease-in-out"
                onClick={() => {
                  logout();
                  setUser(null);
                }}
              >
                Logout
              </a>
            </Link>
          ) : (
            <Link href="/login">
              <a className="text-white uppercase text-right m-4 tracking-wider bg-gray-700 p-2 rounded shadow hover:bg-gray-800 hover:pointer hover:opacity-75 transition duration-300 ease-in-out">
                Sign In
              </a>
            </Link>
          )}
        </div>
      </div>
      {props.children}
    </>
  );
}
