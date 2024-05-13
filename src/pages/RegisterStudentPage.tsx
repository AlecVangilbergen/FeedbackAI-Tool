import React from 'react';
import RegisterStudent from '../components/Student/RegisterStudent';

const RegisterStudentPage: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-light-neutral text-light-text dark:bg-dark-neutral">
      <RegisterStudent />
    </div>
  );
};

export default RegisterStudentPage;
