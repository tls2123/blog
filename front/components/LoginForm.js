import React, {useCallback, useState, useEffect} from 'react';
import Link from 'next/link';
import {useDispatch, useSelector} from 'react-redux';
import Router from 'next/router';

import { Button, Form, Input } from 'antd';
import styled from 'styled-components';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const Container = styled.div`
    margin-top: 10rem;
    text-align: center;
`;
const Footer = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: #1C2135;
    opacity: 0.95;
`

const LoginForm = () => {
    const dispatch = useDispatch();
    const { logInLoading, logInError } = useSelector((state) => state.user)
    const [email, onChangeEmail] = useInput('');
    const [password, onChangePassword] = useInput('');

    //함수에 프롭스를 넘겨주는 함수는 useCallback를 써라 - 그래야 최적화가 가능
    useEffect(() => {
        if(logInError){
            alert(logInError);
        }
    }, [logInError]);
    
    const onSubmitForm = useCallback(() => {
        console.log({email, password});
        dispatch(loginRequestAction({ email, password }));
        Router.push('/')
    }, [email, password]);
    
    return (
        <Container>
            <h2>로그인</h2>
            <br />
            <Form name="basic" labelCol={{ span: 9 }} wrapperCol={{ span: 6 }} initialValues={{ remember: true}}
                onFinish={onSubmitForm}
                autoComplete="off"
            >
                <Form.Item label="Email" name="user-email"
                    rules={[ {required: true, message: 'Please input your username!'},]}>
                <Input name='user-email' value={email} type='email' onChange={onChangeEmail} required/>
                </Form.Item>
                <Form.Item label="Password" name="user-password" 
                    rules={[{required: true, message: 'Please input your password!'},]}>
                <Input.Password name='user-password' value={password} onChange={onChangePassword} required/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 4, span: 16 }}>
                    <Button htmlType="submit" loading={logInLoading}>
                        로그인
                    </Button>
                    &nbsp;&nbsp;
                    <Link href='/signup'><a><Button>회원가입</Button></a></Link>
                </Form.Item>
            </Form>
            <Footer>
                
            </Footer>
        </Container>
    );
}

export default LoginForm;