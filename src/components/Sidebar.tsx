// Sidebar.tsx
import React from 'react';

interface SidebarProps {
    profile: any; // Replace with appropriate type
    submittedCount: number;
}

const Sidebar: React.FC<SidebarProps> = ({ profile, submittedCount }) => {
    return (
        <div className="w-64 bg-white dark:bg-gray-800 p-4 rounded shadow-md">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text">Profile</h2>
                {profile && (
                    <div className="mt-2">
                        <p className="text-light-text dark:text-dark-text">Name: {profile.name}</p>
                        <p className="text-light-text dark:text-dark-text">Email: {profile.email}</p>
                        {/* Add other profile details as needed */}
                    </div>
                )}
            </div>
            <div>
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text">Assignments</h2>
                <p className="text-light-text dark:text-dark-text">Submitted: {submittedCount}</p>
            </div>
        </div>
    );
};

export default Sidebar;
