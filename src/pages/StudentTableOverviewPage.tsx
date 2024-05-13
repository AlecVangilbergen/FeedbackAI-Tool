// StudentTableOverviewPage.tsx

import React from 'react';
import StudentTableOverview from '../components/Student/StudentTableOverview'; // Adjust the path as per your project structure

const StudentTableOverviewPage: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-light-neutral text-light-text dark:bg-dark-neutral">
      <StudentTableOverview />
    </div>
  );
};

export default StudentTableOverviewPage;
