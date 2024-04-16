import React, { useState, useEffect } from 'react';
import { Course, TeacherUploadCourseDocument } from '../../Interfaces/interfaces';
import { fetchCoursesByTeacherId, teacherUploadDocumentToCourse } from '../../services/courseService';
import { User } from '../../data/mockData';
import CourseSelector from './CourseSelector';
import FileUploader from './FileUploader';

const UploadDocumentsForm: React.FC = ()=> {
    const [courses, setCourses] = useState<Course[]>([]);
    const [selectedCourseId, setSelectedCourseId] = useState<string>('');
    const [selectedFile, setSelectedFile] = useState<File | null>();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        try {
            let teacherId = getTeacherIdFromLocalStorage()
            if (teacherId) {
                const data = await fetchCoursesByTeacherId(teacherId);
                setCourses(data);                
            }
        } catch (error) {
            console.error('Error fetching assignments by course:', error);
        }
    };
    const getTeacherIdFromLocalStorage = (): number | null => {
        // Retrieve teacher  ID from local storage
        const user = sessionStorage.getItem('user');

        if (user) {
            const userData: User = JSON.parse(user);
            const studentId = userData.id;
            return studentId
        } else {
            return null;
        }
    };
    return (
        <>
        <div className="container mx-auto p-4">
            <div className="bg-base shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Upload Documents Form</h2>
                <form>
                    <CourseSelector
                        courses={courses}
                        selectedCourse={selectedCourseId}
                        onSelectCourse={handleCourseSelect}
                    />
                    <FileUploader
                        selectedFile={selectedFile}
                        handleFileSelect={handleFileSelect}
                    />
                    <button 
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
                    onClick={handleUploadDocumentSubmit}>Submit</button>
                    {error && <div className="text-red-600 mt-4">{error.toString()}</div>}
                    {loading && <div className="text-green-600 mt-4">Uploading document</div>}
                </form>
            </div>
        </div>
        </>
    );
};

export default UploadDocumentsForm;
