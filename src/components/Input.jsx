import React from 'react';

const Input = ({ label, error, className = "", ...props }) => {
    return (
        <div className={`w-full ${className}`}>
            {label && <label className="label">{label}</label>}
            <input
                className={`input-field ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : ''}`}
                {...props}
            />
            {error && <span className="mt-1 text-xs text-red-500">{error}</span>}
        </div>
    );
};

export default Input;
