import React, { useState, useEffect } from "react";
// Librares
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useFormik, FormikProvider } from "formik";
// Store
import { signUp } from "../store/authSlice";
import { clearMessage } from "../store/messageSlice";
//Components
import TextField from "../components/inputs/TextInput";
import Button from "../components/Button";
import Card from "../components/Card";
import SpinLoading from "../components/SpinLoader";
import StyledNavLink from "../components/StyledNavLink";
//Icons
import { UserIcon, KeyIcon, MailIcon } from "@heroicons/react/outline";
import { useNavigate } from "react-router-dom";

const signUpSchema = Yup.object({
    username: Yup.string()
        .min(3, "Name must contain at least 3 symbols")
        .required("Required"),
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
        .min(4, "Password must contain at least 4 symbols")
        .required("Required"),
});

const initialValues = {
    username: "",
    email: "",
    password: "",
};

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const { message } = useSelector((state) => state.message);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const handleSubmit = (formValues) => {
        const { username, email, password } = formValues;
        setLoading(true);
        setSuccessful(false);

        dispatch(signUp({ username, email, password }))
            .unwrap()
            .then(() => {
                setSuccessful(true);
                navigate("/posts");
            })
            .catch(() => {
                setSuccessful(false);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const formik = useFormik({
        initialValues,
        validationSchema: signUpSchema,
        onSubmit: handleSubmit,
    });

    return (
        <>
            <Card.Title>Sign Up</Card.Title>

            <FormikProvider value={formik}>
                {!successful && (
                    <form
                        className='space-y-6 min-w-[200px] w-full mb-10'
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            label='Username'
                            name='username'
                            icon={UserIcon}
                        />
                        {/* <FloatingTextInput /> */}
                        <TextField label='Email' name='email' icon={MailIcon} />

                        <TextField
                            label='Password'
                            name='password'
                            type='password'
                            icon={KeyIcon}
                        />
                        <div className='pt-2'>
                            <Button disabled={loading}>
                                {loading && <SpinLoading />} Sign Up
                            </Button>
                        </div>
                    </form>
                )}
                {message && (
                    <div className='form-group'>
                        <div
                            className={
                                successful
                                    ? "alert alert-success"
                                    : "alert alert-danger"
                            }
                            role='alert'
                        >
                            {message}
                        </div>
                    </div>
                )}
            </FormikProvider>
            <p className='text-slate-600 text-sm'>
                <span> Already have account? </span>
                <StyledNavLink styleType='underline' to={"/auth/login"}>
                    Log In
                </StyledNavLink>
            </p>
        </>
    );
};

export default SignUpPage;
