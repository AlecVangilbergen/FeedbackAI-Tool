import React from 'react';
import RegisterOrganisation from '../components/Organisation/RegisterOrganisation';

const RegisterOrganisationPage: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-light-neutral text-light-text dark:bg-dark-neutral">
      <RegisterOrganisation />
    </div>
  );
};

export default RegisterOrganisationPage;
