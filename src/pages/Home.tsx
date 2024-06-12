import React from 'react';
import { Link } from 'react-router-dom';
import TeacherReviews from '../components/Teacher/TeacherReviews';
import SubjectCards from '../components/SubjectCards';

const Home: React.FC = () => {
    const user = sessionStorage.getItem('user');
    const role = user ? JSON.parse(user).role : null;


    const getStartedLink = () => {
        if (role === 'teacher') {
            return '/dashboard/teacher';
        } else if (role === 'student') {
            return '/dashboard/student';
        } else {
            return '/login';
        }
    };


    return (
        <main className="min-h-screen bg-light-neutral dark:bg-dark-neutral">
            <div className="container mx-auto">
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8">
                    <div className="col-span-full">
                        <div className="hero bg-base rounded-lg p-8">
                            <div className="hero-content text-center">
                                <div className="max-w-7xl mx-auto mt-10">
                                    <h1 className="text-6xl font-bold text-light-text dark:text-dark-text">No FastAPI, but Fast Feedback!</h1>
                                    <p className="py-6 text-2xl text-light-text dark:text-dark-text">An E-Learning Platform that utilizes OpenAI's API to allow students to get instant personalized feedback, directly from the AI while also allowing teachers to generate example solutions for their assignments.</p>
                                    <Link to={getStartedLink()} className="btn bg-light-btn text-dark-text dark:bg-dark-btn dark:text-light-text dark:btn-primary mt-8">Get Started</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mt-16">
                    <div className="col-span-full">
                        <h2 className="text-3xl text-light-text font-bold text-center mb-4 dark:text-dark-text">Features</h2>
                        <SubjectCards />
                    </div>
                </section>

                <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-8 mt-16">
                    <div className="col-span-full">
                        <h2 className="text-3xl font-bold text-center mb-4 text-light-text dark:text-dark-text">Teacher Reviews</h2>
                        <TeacherReviews />
                    </div>
                </section>

            </div>
        </main>
    );
};

export default Home;
