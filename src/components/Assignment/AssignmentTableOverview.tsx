import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { fetchAssigments } from "../../services/assignmentService";
import CourseImage from '../img/course.jpeg';

const AssignmentTableOverview: React.FC = () => {
  const [assignments, setAssignments] = useState<any[]>([]);
  const [showTemplates, setShowTemplates] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAssigments();
        setAssignments(data);
      } catch (error: any) {
        console.error(error.message);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const user = sessionStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;
    setShowTemplates(role === 'Teacher');
  }, []);

  const handleViewDescription = (id: number) => {
    navigate(`/assignment/${id}`);
  };

  const handleViewTemplates = (id: number) => {
    navigate(`/assignment/${id}/get_templates`);
  };

  return (
    <div className="bg-light-neutral dark:bg-dark-neutral mx-4 py-8">
      <h2 className="text-3xl font-bold mb-8 text-center text-light-text dark:text-dark-text">Assignment Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {assignments.map(assignment => (
          <div key={assignment.id} className="card card-compact bg-light-card dark:bg-dark-card border-2 border-black rounded-lg shadow-lg">
            <div className="card-body p-6">
              <div className="flex justify-center items-center mb-4">
                <h2 className="card-title text-2xl font-bold text-center text-light-text dark:text-dark-text">{assignment.title}</h2>
              </div>
              <p className="text-center text-light-text dark:text-dark-text mb-6">
                <button className="btn btn-primar text-dark-text dark:bg-dark-btn dark:bg-dark-btn dark:text-light-text dark:btn-primary" onClick={() => handleViewDescription(assignment.id)}>View Description</button>
              </p>
              <div className="card-actions justify-center">
                {showTemplates && (
                  <>
                    <button className="btn btn-primary mr-4" onClick={() => handleViewTemplates(assignment.id)}>View Templates</button>
                    <Link className="btn btn-secondary" to={`/generate_template/${assignment.id}`}>Generate Template</Link>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignmentTableOverview;
