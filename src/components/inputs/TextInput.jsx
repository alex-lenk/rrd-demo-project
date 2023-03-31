import React, { useState } from "react";
import { useField } from "formik";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/outline";

const TextField = (props) => {
    const [field, meta] = useField(props);
    const [showPassword, setShowPassword] = useState(false);
    const displayError = meta.touched && meta.error;
    const errorStyle =
        "absolute text-slate-500 ring-blue-700 ring-opacity-5 appearance-none rounded block w-full   sm:text-sm -bottom-6 ";

    const getInputClasses = () => {
        return (
            "w-full py-2 rounded text-sm dark:bg-gray-700 h-12 focus:outline-none bg-white ring-1 ring-slate-900/10 hover:ring-slate-300 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-sm rounded-lg text-slate-400 pr-2 " +
            (props.icon ? "pl-3 xs:pl-12" : "pl-3") +
            (displayError
                ? " ring-1 ring-blue-700 focus:border-blue-700 focus:ring-blue-700 focus:"
                : "")
        );
    };

    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className='my-3 form-outline form-white relative '>
            {props.label && <label htmlFor={props.name}>{props.label}</label>}
            <div className='relative text-slate-500'>
                {props.icon && (
                    <props.icon className='h-6 w-6 absolute z-10 inset-y-3 left-4 hidden xs:inline-block ' />
                )}
                <input
                    placeholder={props.label}
                    id={props.name}
                    {...field}
                    {...props}
                    type={showPassword ? "text" : props.type}
                    className={getInputClasses()}
                />

                {props.type === "password" && (
                    <button
                        className='absolute inset-y-0.5 right-2.5 btn btn-outline-secondary text-slate-500'
                        type='button'
                        onClick={toggleShowPassword}
                    >
                        {showPassword ? (
                            <EyeIcon className='relative w-6 h-6' />
                        ) : (
                            <EyeOffIcon className='relative w-6 h-6' />
                        )}
                    </button>
                )}
                {displayError ? (
                    <div className={errorStyle + "text-end"}>{meta.error}</div>
                ) : null}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text",
};
export default TextField;
