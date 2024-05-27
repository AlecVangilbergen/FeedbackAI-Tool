import React, { useState, useEffect } from "react";
import axios from "axios";
import thumbsUpImg from '../../img/thumbsup.png';
import thumbsDownImg from '../../img/thumbsdown.png';

const FeedbackButtons: React.FC = () => {
    const [reaction, setReaction] = useState<'thumbsUp' | 'thumbsDown' | null>(null);
    const [message, setMessage] = useState<string | null>(null);
    const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

    useEffect(() => {
        const savedReaction = localStorage.getItem('reaction');
        if (savedReaction) {
            setReaction(savedReaction as 'thumbsUp' | 'thumbsDown');
            setIsSubmitted(true);
        }
    }, []);

    const handleReactionClick = async (type: 'thumbsUp' | 'thumbsDown') => {
        if (isSubmitted) return;  // Prevent multiple submissions

        setReaction(type);
        setMessage("Saving your reaction...");
        try {
            const response = await axios.post("http://localhost:8000/reactions", { reaction: type });
            setMessage(response.data.message);
            localStorage.setItem('reaction', type);
            setIsSubmitted(true);  // Mark as submitted
        } catch (error) {
            console.error("Error submitting reaction:", error);
            setMessage("Error saving your reaction. Please try again.");
        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="flex space-x-4">
                <button
                    className={`btn btn-sm ${reaction === 'thumbsUp' ? 'dark:btn-primary' : 'light:btn-grey dark:btn-secondary'} bg-white text-black`}
                    onClick={() => handleReactionClick('thumbsUp')}
                    disabled={isSubmitted}
                >
                    <img src={thumbsUpImg} alt="Thumbs Up" className="w-6 h-6" />
                </button>
                <button
                    className={`btn btn-sm ${reaction === 'thumbsDown' ? 'dark:btn-primary' : 'dark:btn-secondary'} bg-white text-black`}
                    onClick={() => handleReactionClick('thumbsDown')}
                    disabled={isSubmitted}
                >
                    <img src={thumbsDownImg} alt="Thumbs Down" className="w-6 h-6" />
                </button>
            </div>
            {message && <div className="text-center dark:text-white light: text-black">{message}</div>}
        </div>
    );
};

export default FeedbackButtons;
