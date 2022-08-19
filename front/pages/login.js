import React, {useState} from 'react';
import {useSelector} from 'react-redux';
import Link from 'next/link';

import LoginForm from '../components/LoginForm';
import AppLayout from '../components/AppLayout';


const Login = () => {

    return (
        <AppLayout>
            <LoginForm />
        </AppLayout>
    )
}

export default Login;