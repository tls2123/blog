import React, {useState} from 'react';
import {useSelector} from 'react-redux';

import LoginForm from '../components/LoginForm';
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostFrom';

const Login = () => {
    const me = useSelector((state) => state.user.me);
    return (
        <AppLayout>
            {me ? <PostForm /> : <LoginForm />}
        </AppLayout>
    )
}

export default Login;