import React, { useState } from "react";
import thumbsUpImg from '../../img/thumbs-up.png';
import thumbsDownImg from '../../img/thumbs-down.png';

const FeedbackButtons: React.FC = () => {
    const [feedback, setFeedback] = useState<'thumbsUp' | 'thumbsDown' | null>(null);

    const handleThumbUpClick = () => {
        setFeedback('thumbsUp');
    };
    const handleThumbDownClick = () => {
        setFeedback('thumbsDown');
    };
    return (
        <div className="flex space-x-4">
            <button className={`btn btn-sm ${feedback === 'thumbsUp' ? 'btn-primary' : 'btn-secondary'}`} onClick={handleThumbUpClick}>
                <img src={thumbsUpImg} alt="Thumbs Up" className="w-8 h-8" />
            </button>
            <button className={`btn btn-sm ${feedback === 'thumbsDown' ? 'btn-primary' : 'btn-secondary'}`} onClick={handleThumbDownClick}>
                <img src={thumbsDownImg} alt="Thumbs Down" className="w-8 h-8" />
            </button>
        </div>
    );
};
export default FeedbackButtons;