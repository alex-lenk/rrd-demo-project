import React from "react";
const Button = ({ label, children }) => {
    return (
        <button
            type='submit'
            className='inline-flex w-full items-center justify-center py-3 px-5 leading-6 shadow text-sm font-medium rounded-md text-white bg-indigo-500 hover:bg-indigo-400 focus:outline-none my-2'
        >
            {label || children || "button"}
        </button>
    );
};

export default Button;
