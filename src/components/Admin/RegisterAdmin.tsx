import React, { useState } from 'react';
import { registerAdmin } from '../../services/adminService';
import { useNavigate } from 'react-router-dom';

const RegisterAdmin: React.FC = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await registerAdmin(formData);
      setSuccess(true);
      setTimeout(() => {
        navigate('/organisations');
      }, 2000);
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-light-neutral dark:bg-dark-neutral">
      <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Register Admin</h2>
      {success ? (
        <div className="bg-green-200 text-green-800 px-4 py-2 mb-4 bg-light-neutral dark:bg-dark-neutral text-light-text dark:text-dark-text">
          Admin registered successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-light-text dark:text-dark-text">
            <label className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text" htmlFor="username">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-light-neutral dark:bg-dark-neutral"
            />
          </div>
          <div className="mb-4 text-light-text dark:text-dark-text">
            <label className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-light-neutral dark:bg-dark-neutral"
            />
          </div>
          <button
            type="submit"
            className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary"
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
      )}
      {error && <div className="text-red-600 mt-4">{error}</div>}
    </div>
  );
};

export default RegisterAdmin;
