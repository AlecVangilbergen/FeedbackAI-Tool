import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserProfile from '../Profile/UserProfile';

interface DashboardProps {
    role: string;
    username: string;
}

interface UserProfileData {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}

const Dashboard: React.FC<DashboardProps> = ({ role, username }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<UserProfileData | null>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-light-neutral dark:bg-dark-neutral p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="col-span-1">
                    <UserProfile username={username} onProfileFetch={setProfile} />
                    <Sidebar profile={profile} submittedCount={role === 'student' ? 0 : undefined} />
                </div>
                <div className="col-span-2">
                    <h1 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text">Dashboard</h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {role === 'student' && (
                            <>
                                <DashboardItem link="/assignments" text="Assignment Overview" />
                                <DashboardItem link="/feedback" text="Submission Feedback" />
                            </>
                        )}
                        {role === 'teacher' && (
                            <>
                                <DashboardItem link="/assignment" text="Create Assignment" />
                                <DashboardItem link="/registercourse" text="Register Course" />
                                <DashboardItem link="/courses" text="Course Overview" />
                                <DashboardItem link="/assignments" text="Assignment Overview" />
                                <DashboardItem link="/submissions" text="Submission Overview" />
                            </>
                        )}
                        {role === 'admin' && (
                            <>
                                <DashboardItem link="/registerteacher" text="Register Teacher" />
                                <DashboardItem link="/teachers" text="Teacher Overview" />
                                <DashboardItem link="/courses" text="Course Overview" />
                                <DashboardItem link="/registercourse" text="Register Course" />
                                <DashboardItem link="/registerstudent" text="Register Student" />
                                <DashboardItem link="/students" text="Student Overview" />
                            </>
                        )}
                        {role === 'superuser' && (
                            <>
                                <DashboardItem link="/registeradmin" text="Register Admin" />
                                <DashboardItem link="/admins" text="Admin Overview" />
                                <DashboardItem link="/registerorg" text="Register Organisation" />
                                <DashboardItem link="/organisations" text="Organisation Overview" />
                                <DashboardItem link="/feedback" text="Submission Feedback" />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

interface DashboardItemProps {
    link: string;
    text: string;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ link, text }) => {
    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
            <Link to={link} className="text-blue-500 dark:text-blue-300">
                {text}
            </Link>
        </div>
    );
};

export default Dashboard;
