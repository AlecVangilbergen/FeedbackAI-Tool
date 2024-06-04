import { Link } from "react-router-dom";

const Home: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Welkom!</h1>
            <div className="border border-gray-300 rounded-md p-4">
                <h2 className="text-lg font-semibold mb-2">Selecteer een rol om in te loggen:</h2>
                <div className="flex flex-col space-y-4">
                    <Link to="/login?role=student" className="btn bg-blue-500 text-white rounded px-4 py-2">
                        Student
                    </Link>
                    <Link to="/login?role=teacher" className="btn bg-green-500 text-white rounded px-4 py-2">
                        Teacher
                    </Link>
                    <Link to="/login?role=admin" className="btn bg-yellow-500 text-white rounded px-4 py-2">
                        Admin
                    </Link>
                    <Link to="/login?role=superuser" className="btn bg-red-500 text-white rounded px-4 py-2">
                        SuperAdmin
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
