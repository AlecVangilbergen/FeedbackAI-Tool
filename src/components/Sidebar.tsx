import React from 'react';

interface SidebarProps {
    profile: UserProfileData | null;
    courseCount?: number;
    teacherCount?: number;
    studentCount?: number;
    organisationCount?: number;
}

interface UserProfileData {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}

const Sidebar: React.FC<SidebarProps> = ({ profile, courseCount, teacherCount, studentCount, organisationCount }) => {
    return (
        <div className="w-64 bg-white dark:bg-gray-800 p-4 rounded shadow-md">
            <div className="mb-4">
                <h2 className="text-xl font-bold text-light-text dark:text-dark-text">Profile</h2>
                {profile && (
                    <div className="mt-2">
                        <p className="text-light-text dark:text-dark-text">Name: {profile.firstname} {profile.lastname}</p>
                        <p className="text-light-text dark:text-dark-text">Email: {profile.email}</p>
                        <p className="text-light-text dark:text-dark-text">Role: {profile.role}</p>
                    </div>
                )}
            </div>
            {profile && profile.role === 'teacher' && (
                <div>
                    <h2 className="text-xl font-bold text-light-text dark:text-dark-text">Courses</h2>
                    <p className="text-light-text dark:text-dark-text">Total: {courseCount || 0}</p>
                </div>
            )}
            {profile && profile.role === 'admin' && (
                <div>
                    <h2 className="text-xl font-bold text-light-text dark:text-dark-text">Admin Stats</h2>
                    <p className="text-light-text dark:text-dark-text">Teachers: {teacherCount || 0}</p>
                    <p className="text-light-text dark:text-dark-text">Students: {studentCount || 0}</p>
                    <p className="text-light-text dark:text-dark-text">Courses: {courseCount || 0}</p>
                </div>
            )}
            {profile && profile.role === 'superuser' && (
                <div>
                    <h2 className="text-xl font-bold text-light-text dark:text-dark-text">Superuser Stats</h2>
                    <p className="text-light-text dark:text-dark-text">Organisations: {organisationCount || 0}</p>
                    <p className="text-light-text dark:text-dark-text">Teachers: {teacherCount || 0}</p>
                    <p className="text-light-text dark:text-dark-text">Students: {studentCount || 0}</p>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
