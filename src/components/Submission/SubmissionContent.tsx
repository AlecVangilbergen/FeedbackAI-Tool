import React from "react";

interface SubmissionContentProps {
  content: string;
}

const SubmissionContent: React.FC<SubmissionContentProps> = ({ content }) => {
  // Function to convert the description text into HTML format
  const formatDescription = (description: string) => {
    // Split the description into paragraphs based on the newline characters
    const paragraphs = description.split("\n");

    // Map each paragraph to a <p> element
    return paragraphs.map((paragraph, index) => (
      <p key={index} className="mb-4">{paragraph}</p>
    ));
  };

  return (
    <div className="p-6 bg-light-neutral dark-bg-dark-neutral">
      <h2 className="text-xl font-bold mb-4 text-light-text dark:-text-dark-text">Submission Content</h2>
      <div className="text-light-text dark:-text-dark-text">
        {formatDescription(content)}
      </div>
    </div>
  );
}

export default SubmissionContent;