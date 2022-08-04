import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import LoginForm from '../components/LoginForm';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';

const Login = () => {
    const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
    return (
        <AppLayout>
            {isLoggedIn ? <PostForm /> : <LoginForm />}
        </AppLayout>
    )
}

export default Login;