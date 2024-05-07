import React, { useState } from "react";
import thumbsUpImg from '../../img/thumbsup.png';
import thumbsDownImg from '../../img/thumbsdown.png';

const FeedbackButtons: React.FC = () => {
    const [feedback, setFeedback] = useState<'thumbsUp' | 'thumbsDown' | null>(null);

    const handleThumbUpClick = () => {
        setFeedback('thumbsUp');
    };
    const handleThumbDownClick = () => {
        setFeedback('thumbsDown');
    };
    return (
        <div className="flex space-x-4 ">
            <button className={`btn btn-sm ${feedback === 'thumbsUp' ? ' dark:btn-primary' : 'light:btn-grey dark:btn-secondary'} bg-white text-black`} onClick={handleThumbUpClick}>
                <img src={thumbsUpImg} alt="Thumbs Up" className="w-6 h-6" />
            </button>
            <button className={`btn btn-sm ${feedback === 'thumbsDown' ? 'dark:btn-primary' : 'dark:btn-secondary'} bg-white text-black`} onClick={handleThumbDownClick}>
                <img src={thumbsDownImg} alt="Thumbs Down" className="w-6 h-6" />
            </button>
        </div>
    );
};
export default FeedbackButtons;