import SubmissionTableOverview from "../components/Submission/SubmissionTableOverview";
import React from "react";


const SubmissionOverviewPage: React.FC = () => {
  return (
    <div className="min-h-screen min-w-screen bg-light-neutral text-light-text dark:bg-dark-neutral">
      <SubmissionTableOverview />
    </div>
  );
};

export default SubmissionOverviewPage;