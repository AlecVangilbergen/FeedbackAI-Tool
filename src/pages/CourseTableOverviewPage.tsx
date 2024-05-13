// OrganizationsOverviewPage.tsx

import React from 'react';
import CourseTableOverview from '../components/Course/CourseOverviewTable'; // Adjust the path as per your project structure

const CourseOverviewTable: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-light-neutral text-light-text dark:bg-dark-neutral">
      <CourseTableOverview />
    </div>
  );
};

export default CourseOverviewTable;
