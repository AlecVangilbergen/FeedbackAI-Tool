import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import UserProfile from '../Profile/UserProfile';

interface DashboardProps {
    role: string;
}

const Dashboard: React.FC<DashboardProps> = ({ role }) => {
    const navigate = useNavigate();
    const [profile, setProfile] = useState<any>(null);

    useEffect(() => {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            navigate('/login');
        } else {
            const user = JSON.parse(sessionStorage.getItem('user') || '{}');
            setProfile(user);
        }
    }, [navigate]);

    return (
        <div className="min-h-screen bg-light-neutral dark:bg-dark-neutral p-8">
            <h1 className="text-3xl font-bold mb-6 text-light-text dark:text-dark-text">Dashboard</h1>

            <div className="grid grid-cols-4 gap-6">
                <div className="col-span-1 border-slate-950">
                    <Sidebar profile={profile} />
                </div>
                <div className="col-span-3 grid grid-cols-2 gap-6">
                    {role === 'student' && (
                        <>
                            <DashboardItem link="/assignments" text="Assignment Overview" />
                            <DashboardItem link="/feedback" text="Submission Feedback" />
                            {profile && <UserProfile userId={profile.id} />}
                        </>
                    )}
                    {role === 'teacher' && (
                        <>
                            <DashboardItem link="/assignment" text="Create Assignment" />
                            <DashboardItem link="/assignments" text="Assignment Overview" />
                            <DashboardItem link="/registercourse" text="Register Course" />
                            <DashboardItem link="/courses" text="Course Overview" />
                            <DashboardItem link="/submissions" text="Submission Overview" />
                        </>
                    )}
                    {role === 'admin' && (
                        <>
                            <DashboardItem link="/registerteacher" text="Register Teacher" />
                            <DashboardItem link="/teachers" text="Teacher Overview" />
                            <DashboardItem link="/registercourse" text="Register Course" />
                            <DashboardItem link="/courses" text="Course Overview" />
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
    );
};

interface DashboardItemProps {
    link: string;
    text: string;
}

const DashboardItem: React.FC<DashboardItemProps> = ({ link, text }) => {
    return (
        <div className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary py-4 px-2 rounded-lg w-auto">
            <Link to={link} className="text-white dark:text-white">
                {text}
            </Link>
        </div>
    );
};

export default Dashboard;
