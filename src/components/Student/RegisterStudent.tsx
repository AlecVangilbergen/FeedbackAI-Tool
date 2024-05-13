import React, { useState, useEffect } from 'react';
import { registerStudent } from '../../services/studentService';
import { fetchOrganizations } from '../../services/organisationService';
import { useNavigate } from 'react-router-dom';

const RegisterStudent: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    email: '',
    password: '',
    organisation_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [organizations, setOrganizations] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrganizationsData = async () => {
      try {
        const data = await fetchOrganizations();
        setOrganizations(data);
      } catch (error) {
        console.error('Error fetching organizations:', error);
      }
    };

    fetchOrganizationsData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'organisationId' ? parseInt(value) : value; // Parse organisationId as integer
    setFormData(prevState => ({ ...prevState, [name]: parsedValue }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('formData', formData);
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Parse organisationId to an integer before sending the data
      const dataToSend = { ...formData, organisationId: parseInt(formData.organisation_id) };
      await registerStudent(dataToSend);
      setSuccess(true);
      setTimeout(() => {
        navigate('/students');
      }, 2000);
    } catch (error: any) {
      setError(error.response.data.detail || 'An error occurred while registering the teacher');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-light-neutral dark:bg-dark-neutral">
      <h2 className="text-xl font-bold mb-4 text-light-text dark:text-dark-text">Register Student</h2>
      {success ? (
        <div className="bg-green-200 text-green-800 px-4 py-2 mb-4 bg-light-neutral dark:bg-dark-neutral">
          Student registered successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
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
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text" htmlFor="lastname">
              Lastname
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-light-neutral dark:bg-dark-neutral"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-light-neutral dark:bg-dark-neutral"
              required
            />
          </div>
          <div className="mb-4">
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
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2 text-light-text dark:text-dark-text" htmlFor="organisation_id">
              Organisation
            </label>
            <select
              id="organisation_id"
              name="organisation_id"
              value={formData.organisation_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2 bg-light-neutral dark:bg-dark-neutral"
              required
            >
              <option value="">Select Organisation</option>
              {organizations.map(org => (
                <option key={org.id} value={org.id}>
                  {org.name}
                </option>
              ))}
            </select>
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

export default RegisterStudent;
