// OrganizationsOverviewPage.tsx

import React from 'react';
import OrganizationsOverviewTable from '../components/Organisation/OrganisationTableOverview'; // Adjust the path as per your project structure

const OrganizationsOverviewPage: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-light-neutral text-light-text dark:bg-dark-neutral">
      <OrganizationsOverviewTable />
    </div>
  );
};

export default OrganizationsOverviewPage;
