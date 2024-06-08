import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [role, setRole] = useState('student'); // Default role set to 'student'
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const roleParam = queryParams.get('role');
    if (roleParam) {
      setRole(roleParam);
    }
  }, [location.search]);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      formData.append('role', role);

      console.log("Logging in with:", { username, password, role });

      const response = await axios.post('http://localhost:8000/login', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      const { access_token, role: retrievedUserRole } = response.data;
      sessionStorage.setItem('access_token', access_token);
      sessionStorage.setItem('role', retrievedUserRole);
      console.log('User role stored:', retrievedUserRole);

      console.log('Login successful:', { access_token, retrievedUserRole });

      // Navigate to the appropriate dashboard based on role
      switch (retrievedUserRole) {
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
      console.error("Login error:", error);
      setError('Invalid username or password.');
    }
  };


  return (
    <div className="min-h-screen bg-light-neutral dark:bg-dark-neutral justify-center">
      <div className="hero min-h-screen bg-light-neutral dark:bg-dark-neutral">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left ml-9">
            <h1 className="text-5xl font-bold text-light-text dark:bg-dark-neutral dark:text-dark-text">Login now!</h1>
            <p className="py-6 dark:bg-dark-neutral text-light-text dark:text-dark-text">Welcome to the FeedbackAI-Tool</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-light-neutral text-light-text dark:bg-dark-neutral">
              <div className="card-body">
                <div className="form-control">
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
                  <div className="mb-4">
                    <label htmlFor="role" className="block text-sm font-medium text-light-text dark:text-dark-text">Role</label>
                    <select
                      id="role"
                      name="role"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full border rounded px-3 py-2 text-light-text dark:text-dark-text bg-light-neutral dark:bg-dark-neutral dark:border-gray-500 dark:focus-dark-primary focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      required>
                      <option value="student">Student</option>
                      <option value="teacher">Teacher</option>
                      <option value="admin">Admin</option>
                      <option value="superuser">Superuser</option>
                    </select>
                  </div>
                  {error && <div className="text-red-500 mb-4">{error}</div>}
                  <div>
                    <button type="submit" className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary">Login</button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
