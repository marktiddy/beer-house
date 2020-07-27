import React, { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import { login } from '../lib/auth';
import AppContext from '../context/AppContext';

function Login(props) {
  const [data, updateData] = useState({ identifier: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const router = useRouter();
  const appContext = useContext(AppContext);

  useEffect(() => {
    if (appContext.isAuthenticated) {
      router.push('/');
    }
  }, []);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <div className="w-full">
      <h2 className="text-lg text-gray-800 text-center mb-4">Sign In</h2>
      <div>
        {Object.entries(error).length !== 0 &&
          error.constructor === Object &&
          error.message.map((error) => {
            return (
              <div key={error.messages[0].id} style={{ marginBottom: 10 }}>
                <small style={{ color: 'red' }}>
                  {error.messages[0].message}
                </small>
              </div>
            );
          })}
      </div>
      <div className="border border-gray-300 shadow-lg bg-gray-100 w-3/4 text-center m-auto">
        <form>
          <fieldset disabled={loading}>
            <div className="m-2 flex w-full items-center justify-center flex-col">
              <label for="email">Email</label>
              <input onChange={(e) => onChange(e)} name="identifier" />
            </div>
            <div className="m-2 flex w-full items-center justify-center flex-col">
              <label for="password">Password</label>
              <input
                onChange={(e) => onChange(e)}
                type="password"
                name="password"
              />
            </div>
            <div className="m-2 flex w-full items-center justify-center flex-col">
              <a href="" className="mt-4 text-sm">
                Forgot password?
              </a>
            </div>
            <div className="m-2 flex w-full items-center justify-center flex-col">
              <button
                onClick={() => {
                  setLoading(true);
                  login(data.identifier, data.password)
                    .then((res) => {
                      setLoading(false);
                      appContext.setUser(res.data.user);
                    })
                    .catch((error) => {
                      setError(error.response.data);
                      setLoading(false);
                    });
                }}
                className="bg-gray-800 text-white text-sm uppercase shadow rounded p-2 text-center hover:bg-gray-700 hover:cursor-pointer transition transition-all transition-300 linear"
              >
                {loading ? 'Loading...' : 'Log In'}
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}

export default Login;
