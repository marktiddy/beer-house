import React, { useState, useContext } from 'react';
import AppContext from '../context/AppContext';
import { registerUser } from '../lib/auth';

const Register = () => {
  const [data, setData] = useState({ email: '', username: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const appContext = useContext(AppContext);

  return (
    <div className="w-full p-4">
      <h2 className="text-xl text-gray-700 text-center mb-4">Register</h2>
      <div className="w-full bg-red-300">
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
      <form>
        <div className="border border-gray-300 shadow-lg bg-gray-100 w-3/4 text-center m-auto">
          <fieldset disabled={loading}>
            <div className="m-2 flex w-full items-center justify-center flex-col">
              <label for="username" className="text-gray-700">
                Username
              </label>
              <input
                onChange={(e) => setData({ ...data, username: e.target.value })}
                value={data.username}
                type="text"
                name="username"
                className="border rounded border-gray-700 shadow p-1 ml-4 text-gray-700"
              />
            </div>
            <div className="m-2 flex w-full items-center justify-center flex-col">
              <label for="email" className="text-gray-700">
                Email:
              </label>
              <input
                onChange={(e) => setData({ ...data, email: e.target.value })}
                value={data.email}
                type="email"
                name="email"
                id="email"
                className="border rounded border-gray-700 shadow p-1 ml-4 text-gray-700"
              />
            </div>
            <div className="m-2 flex w-full items-center justify-center flex-col">
              <label for="password" className="text-gray-700">
                Password
              </label>
              <input
                onChange={(e) => setData({ ...data, password: e.target.value })}
                value={data.password}
                type="password"
                name="password"
                className="border rounded border-gray-700 shadow p-1 ml-4 text-gray-700"
              />
            </div>
            <div className="m-2 mt-6 flex w-full items-center justify-center flex-col">
              <button
                disabled={loading}
                onClick={() => {
                  setLoading(true);
                  registerUser(data.username, data.email, data.password)
                    .then((res) => {
                      //Set auth in global context
                      appContext.setUser(res.data.user);
                      setLoading(false);
                    })
                    .catch((error) => {
                      setError(error.response.data);
                      setLoading(false);
                    });
                }}
                className="bg-gray-800 text-white text-sm uppercase shadow rounded p-2 text-center hover:bg-gray-700 hover:cursor-pointer transition transition-all transition-300 linear"
              >
                {loading ? 'Loading..' : 'Submit'}
              </button>
            </div>
          </fieldset>
        </div>
      </form>
    </div>
  );
};

export default Register;
