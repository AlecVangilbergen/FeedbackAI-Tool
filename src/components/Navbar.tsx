import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear sessionStorage
        sessionStorage.removeItem("user");
        // Redirect to homepage
        navigate("/");
    };

    // Determine user role based on sessionStorage
    const user = sessionStorage.getItem("user");
    const role = user ? JSON.parse(user).role : null;

    return (
        <div className="navbar bg-light-neutral text-light-text dark:bg-dark-neutral dark:text-dark-text">
            <div className="flex-none">
                <div className="dropdown dropdown-bottom">
                    <div tabIndex={0} role="button" className="btn btn-ghost rounded-btn">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block w-5 h-5 stroke-current"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            ></path>
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu dropdown-content z-[1] p-2 shadow rounded-box w-52 mt-4 bg-dark-neutral dark:bg-base-900 text-base-content dark:text-dark-text"
                    >

                            {role === 'Student' && (
                                <>
                                    <li>
                                        <Link to="/assignments" className="text-dark-text dark:text-dark-text">Assignment Overview</Link>
                                    </li>
                                    <li>
                                        <Link to="/feedback" className="text-dark-text dark:text-dark-text">Submission Feedback</Link>
                                    </li>
                                </>
                            )}
                            {role === 'Teacher' && (
                                <>
                                    <li>
                                        <Link to="/assignment" className="text-dark-text dark:text-dark-text">Create Assignment</Link>
                                    </li>
                                    <li>
                                        <Link to="/registercourse" className="text-dark-text dark:text-dark-text">Register Course</Link>
                                    </li>
                                    <li>
                                        <Link to="/courses" className="text-dark-text dark:text-dark-text">Course Overview</Link>
                                    </li>
                                    <li>
                                        <Link to="/assignments" className="text-dark-text dark:text-dark-text">Assignment Overview</Link>
                                    </li>
                                    <li>
                                        <Link to="/submissions" className="text-dark-text dark:text-dark-text">Submission Overview</Link>
                                    </li>
                                </>
                            )}
                            {role === 'Organisation Admin' && (
                                <>
                                    <li>
                                        <Link to="/registerteacher" className="text-dark-text dark:text-dark-text">Register Teacher</Link>
                                    </li>
                                    <li>
                                        <Link to="/teachers" className="text-dark-text dark:text-dark-text">Teacher Overview</Link>
                                    </li>
                                    <li>
                                        <Link to="/courses" className="text-dark-text dark:text-dark-text">Course Overview</Link>
                                    </li>
                                    <li>
                                        <Link to="/registercourse" className="text-dark-text dark:text-dark-text">Register Course</Link>
                                    </li>
                                    <li>
                                        <Link to="/registerstudent" className="text-dark-text dark:text-dark-text">Register Student</Link>
                                    </li>
                                    <li>
                                        <Link to="/students" className="text-dark-text dark:text-dark-text">Student Overview</Link>
                                    </li>
                                </>
                            )}
                            {role === 'Super User' && (
                                <>
                                    <li>
                                        <Link to="/registeradmin" className="text-dark-text dark:text-dark-text">Register Admin</Link>
                                    </li>
                                    <li>
                                        <Link to="/admins" className="text-dark-text dark:text-dark-text">Admin Overview</Link>
                                    </li>
                                    <li>
                                        <Link to="/registerorg" className="text-dark-text dark:text-dark-text">Register Organisation</Link>
                                    </li>
                                    <li>
                                        <Link to="/organisations" className="text-dark-text dark:text-dark-text">Organisation Overview</Link>
                                    </li>
                                    <li>
                                        <Link to="/feedback" className="text-dark-text dark:text-dark-text">Submission Feedback</Link>
                                    </li>
                                </>
                            )}
                            {!user && (
                                <li>
                                    <Link to="/login" className="text-dark-text dark:text-dark-text">Login</Link>
                                </li>
                            )}
                            {user && (
                                <li>
                                    <button
                                        onClick={handleLogout}
                                        className="text-dark-text dark:text-dark-text"
                                    >
                                        Logout
                                    </button>
                                </li>
                            )}
                    </ul>
                </div>
            </div>
            <div className="flex-1">
                <Link to="/" className="btn btn-ghost text-2xl">FeedbackAI-Tool</Link>
            </div>
            <div className="flex-none">
                <label className="flex cursor-pointer gap-2 mr-10" htmlFor="theme-switch">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <circle cx="12" cy="12" r="5" />
                        <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
                    </svg>
                    <input
                        type="checkbox"
                        id="theme-switch"
                        value="dark"
                        className="toggle theme-controller"
                        onChange={(e) =>
                            document.documentElement.classList.toggle(
                                "dark",
                                e.target.checked
                            )
                        }
                    />
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                    </svg>
                </label>
            </div>
        </div>
    );
};

export default Navbar;
