import React, { useState, useEffect } from 'react';
import { fetchTeachers } from '../../services/teacherService';
import { registerCourse } from '../../services/courseService';
import { useNavigate } from 'react-router-dom';

const RegisterCourse: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    teacher_id: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [teachers, setTeachers] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTeachersData = async () => {
      try {
        const data = await fetchTeachers();
        setTeachers(data);
      } catch (error) {
        console.error('Error fetching teachers:', error);
      }
    };

    fetchTeachersData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const parsedValue = name === 'teacherId' ? parseInt(value) : value; // Parse organisationId as integer
    setFormData(prevState => ({ ...prevState, [name]: parsedValue }));
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log('formData', formData);
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Parse organisationId to an integer before sending the data
      const dataToSend = { ...formData, teacher_id: parseInt(formData.teacher_id) };
      await registerCourse(dataToSend);
      setSuccess(true);
      setTimeout(() => {
        navigate('/courses');
      }, 2000);
    } catch (error: any) {
      setError(error.response.data.detail || 'An error occurred while registering the teacher');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Register Course</h2>
      {success ? (
        <div className="bg-green-200 text-green-800 px-4 py-2 mb-4">
          Course registered successfully!
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-bold mb-2" htmlFor="teacher_id">
              Teacher
            </label>
            <select
              id="teacher_id"
              name="teacher_id"
              value={formData.teacher_id}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Teacher</option>
              {teachers.map(org => (
                <option key={org.id} value={org.id}>
                  {org.email}
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
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

export default RegisterCourse;
