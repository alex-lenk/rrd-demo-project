import React from "react";

const Card = ({ children }) => {
    return (
        <div className='bg-white rounded-lg overflow-hidden ring-1 ring-slate-900/5 shadow-xl p-8  mb-20 min-w-full xs:min-w-[400px] '>
            {children}
        </div>
    );
};
const CardTitle = ({ children, label }) => {
    return (
        <h1 className='text-slate-800 mb-6 text-5xl '>{children || label}</h1>
    );
};

Card.Title = CardTitle;
export default Card;
