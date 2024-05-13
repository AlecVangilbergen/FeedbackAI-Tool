// RegisterPage.tsx
import React from 'react';
import RegisterForm from '../components/RegisterUserForm';

const RegisterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-base flex items-center justify-center bg-light-neutral dark:bg-dark-neutral">
      <div className="bg-base rounded-lg shadow-2xl p-8 max-w-md w-full">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;
