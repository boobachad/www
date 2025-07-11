"use client";

import React from 'react';


interface CustomButtonProps {
    text: string;
    className?: string;
}


const CustomButton: React.FC<CustomButtonProps> = ({ text, className }) => {

    const handleButtonClick = () => {
        alert(`Button "${text}" was clicked!`);
    };

    return (
        <button
            className={`px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-md shadow hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 ${className}`}
            onClick={handleButtonClick}
        >
            {text}
        </button>
    );
};

export default CustomButton;
