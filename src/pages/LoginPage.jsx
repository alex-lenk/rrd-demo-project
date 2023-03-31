import React, { useState, useEffect } from "react";
// Librares
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useFormik, FormikProvider } from "formik";
// Store
import { login } from "../store/authSlice";
import { clearMessage } from "../store/messageSlice";
// Components
import SpinLoading from "../components/SpinLoader";
import StyledNavLink from "../components/StyledNavLink";
import Button from "../components/Button";
import TextField from "../components/inputs/TextInput";
import Card from "../components/Card";
// Icons
import { UserIcon, KeyIcon } from "@heroicons/react/outline";
import { useLocation, useNavigate } from "react-router-dom";

const validationSchema = Yup.object().shape({
    username: Yup.string().required("This field is required!"),
    password: Yup.string().required("This field is required!"),
});

const initialValues = {
    username: "",
    password: "",
};

const LoginPage = () => {
    const [loading, setLoading] = useState(false);
    const { message } = useSelector((state) => state.message);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();

    useEffect(() => {
        dispatch(clearMessage());
    }, [dispatch]);

    const handleLogin = (formValue) => {
        const { username, password } = formValue;
        setLoading(true);
        const redirect = location.state
            ? location.state.referrer.pathname
            : "/posts";
        dispatch(login({ username, password }))
            .unwrap()
            .then(() => {
                navigate(redirect, { replace: true });
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleLogin,
    });

    return (
        <>
            <div className='mb-12 text-slate-900'>
                <Card.Title>Login</Card.Title>

                <div className='text-sm text-slate-600'>
                    or{" "}
                    <StyledNavLink to='../signUp' styleType='underline'>
                        {" "}
                        start your 14-day free trial
                    </StyledNavLink>
                </div>
                <FormikProvider value={formik}>
                    <form
                        className='space-y-6 min-w-[200px] w-full mb-10'
                        onSubmit={formik.handleSubmit}
                    >
                        <TextField
                            label='Username'
                            name='username'
                            icon={UserIcon}
                        />
                        <TextField
                            label='Password'
                            name='password'
                            type='password'
                            icon={KeyIcon}
                        />
                        <div className='pt-2'>
                            <Button disabled={loading}>
                                {loading && <SpinLoading />} Log In
                            </Button>
                        </div>
                    </form>

                    {message && (
                        <div className='form-group'>
                            <div className='alert alert-danger' role='alert'>
                                {message}
                            </div>
                        </div>
                    )}
                </FormikProvider>
            </div>
        </>
    );
};

export default LoginPage;
