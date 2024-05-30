import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);

      const response = await axios.post('http://localhost:8000/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, role } = response.data;
      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem('role', role);

      // Navigate to the appropriate dashboard based on role
      switch (role) {
        case 'student':
          navigate('/dashboard/student');
          break;
        case 'teacher':
          navigate('/dashboard/teacher');
          break;
        case 'admin':
          navigate('/dashboard/admin');
          break;
        case 'superuser':
          navigate('/dashboard/superuser');
          break;
        default:
          navigate('/');
      }
    } catch (error) {
      setError('Invalid username or password.');
    }
  };

  return (
    <div className="min-h-screen bg-light-neutral dark:bg-dark-neutral justify-center">
      <div className="bg-light-neutral dark:bg-dark-neutral rounded p-8 max-w-md w-full">
        <form onSubmit={handleLogin}>
          <h2 className="text-2xl text-light-text dark:text-dark-text font-semibold mb-4">Login</h2>
          <div className="mb-4">
            <label htmlFor="username" className="block text-sm font-medium text-light-text dark:text-dark-text">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:focus-dark-primary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-light-text dark:text-dark-text">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:focus-dark-primary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              required
            />
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div>
            <button type="submit" className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
