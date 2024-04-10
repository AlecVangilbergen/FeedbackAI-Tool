import React, { useState, useEffect } from 'react';
import SubmissionButton from './SubmissionButton';
import AssignmentSelector from './AssignmentSelecter';
import SubmissionInput from './SubmissionInput';
import { Assignment, CreateSubmission, Feedback } from '../../Interfaces/interfaces';
import { fetchAssigments } from '../../services/assignmentService';
import { submitAssignment } from '../../services/feedbackService';
import { User } from '../../data/mockData';

const FeedbackForm: React.FC = ()=> {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [selectedAssignment, setSelectedAssignment] = useState<string>('');
    const [submission, setSubmission] = useState<string>('');
    const [feedback, setFeedback] = useState<string>('Please submit your work');
    useEffect(() => {
        getAssignments();
    }, []);

    const getAssignments = async () => {
        try {
            // Perform your fetch request here
            const data = await fetchAssigments();
            // Assuming your data is an array of assignments
            setAssignments(data);
        } catch (error) {
            console.error('Error fetching assignments:', error);
        }
    };
    return (
        <>
        <div className="container mx-auto p-4">
            <div className="bg-base shadow-2xl rounded px-8 pt-6 pb-8 mb-4">
                <h2 className="text-2xl font-bold mb-4 text-center">Assignment Form</h2>
                <form>
                        <AssignmentSelector assignments={assignments} selectedAssignment={selectedAssignment} onSelectAssignment={handleAssignmentSelect} />
                        <SubmissionInput value={submission} onChange={setSubmission} />
                        <SubmissionButton onSubmit={handleSubmissionSubmit} />
                        {error && <div className="text-red-600 mt-4">{error.toString()}</div>}
                        {loading && <div className="text-green-600 mt-4">Gathering Feedback</div>}

                </form>
            </div>
        </div>
        </>
    );
};

export default FeedbackForm;
