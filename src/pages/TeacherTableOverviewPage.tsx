// TeacherOverviewPage.tsx

import React from 'react';
import TeacherOverviewTable from '../components/Teacher/TeacherTableOverview'; // Adjust the path as per your project structure

const TeacherOverviewPage: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-light-neutral text-light-text dark:bg-dark-neutral">
      <TeacherOverviewTable />
    </div>
  );
};

export default TeacherOverviewPage;
