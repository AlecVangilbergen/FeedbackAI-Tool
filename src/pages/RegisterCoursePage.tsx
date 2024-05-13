import React from 'react';
import RegisterCourse from '../components/Course/RegisterCourse';

const RegisterCoursePage: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-light-neutral text-light-text dark:bg-dark-neutral">
      <RegisterCourse />
    </div>
  );
};

export default RegisterCoursePage;
