/* eslint-disable react/prop-types */
import React, { useId } from 'react';

const Input = React.forwardRef(function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref) {
    const id = useId();

    return (
        <div className="w-full">
            {label && <label className="block mb-1 text-sm font-medium text-gray-700" htmlFor={id}>{label}</label>}
            <input
                type={type}
                className={`block w-full px-3 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white border border-gray-300 ${className}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    );
});

export default Input;
