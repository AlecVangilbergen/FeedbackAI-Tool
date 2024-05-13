import React from 'react';
import RegisterAdmin from '../components/Admin/RegisterAdmin';

const RegisterAdminPage: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-light-neutral text-light-text dark:bg-dark-neutral">
      <RegisterAdmin />
    </div>
  );
};

export default RegisterAdminPage;
