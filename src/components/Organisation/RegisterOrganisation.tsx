import React, { useState } from 'react';
import { registerOrganisation } from '../../services/organisationService';
import { useNavigate } from 'react-router-dom';

const RegisterOrganisation: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
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
      await registerOrganisation(formData);
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
      <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Register Organisation</h2>
      {success ? (
        <div className="bg-green-200 text-green-800 px-4 py-2 mb-4 bg-light-neutral dark:bg-dark-neutral">
          Organisation registered successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-light-text dark:text-dark-text">
            <label className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-light-neutral dark:bg-dark-neutral"
            />
          </div>
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

export default RegisterOrganisation;
