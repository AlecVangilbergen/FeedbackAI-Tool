// CourseRegistrationPage.tsx
import React from 'react';
import CourseRegistration from '../components/CourseRegistration';

const CourseRegistrationPage: React.FC = () => {
    return (

        <div className="min-h-screen bg-base flex items-center justify-center bg-light-neutral dark:bg-dark-neutral">
            <div className="bg-base rounded-lg p-8 max-w-md w-full  bg-light-neutral dark:bg-dark-neutral">
                <CourseRegistration />
            </div>
        </div>
    );
};

export default CourseRegistrationPage;
