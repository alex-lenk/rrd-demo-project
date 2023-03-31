import React from "react";
import { NavLink } from "react-router-dom";
const NavBarLogo = ({ link, src, label }) => {
    return (
        <NavLink
            to={link}
            className='flex mr-3 flex-none overflow-hidden md:w-auto text-slate-200 items-center'
        >
            <img
                src={src}
                className='h-8 inline-block items-center'
                alt='rr-logo'
            />
            <span className='text-slate-800 mx-4 font-bold'>{label}</span>
        </NavLink>
    );
};

export default NavBarLogo;
