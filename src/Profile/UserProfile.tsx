// UserProfile.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface UserProfileProps {
    userId: number;
}

interface UserProfile {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    role: string;
}

const UserProfile: React.FC<UserProfileProps> = ({ userId }) => {
    const [profile, setProfile] = useState<UserProfile | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`/api/users/profile/${userId}`);
                setProfile(response.data);
            } catch (error) {
                console.error("Error fetching profile", error);
            }
        };
        fetchProfile();
    }, [userId]);

    if (!profile) {
        return <div>Loading...</div>;
    }

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded shadow-md">
            <h2 className="text-2xl font-bold text-light-text dark:text-dark-text">Profile</h2>
            <p className="text-light-text dark:text-dark-text"><strong>Username:</strong> {profile.username}</p>
            <p className="text-light-text dark:text-dark-text"><strong>First Name:</strong> {profile.firstname}</p>
            <p className="text-light-text dark:text-dark-text"><strong>Last Name:</strong> {profile.lastname}</p>
            <p className="text-light-text dark:text-dark-text"><strong>Email:</strong> {profile.email}</p>
            <p className="text-light-text dark:text-dark-text"><strong>Role:</strong> {profile.role}</p>
        </div>
    );
};

export default UserProfile;
