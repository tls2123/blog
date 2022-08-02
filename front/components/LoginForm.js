import React, {useCallback, useState} from 'react';
import Link from 'next/link';
import {useDispatch} from 'react-redux';
import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { loginAction } from '../reducers';

const Container = styled.div`
    margin-top: 10rem;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const [id, onChangeId] = useInput('');
    const [password, onChangePassword] = useInput('');
    
    const onSubmitForm = useCallback(() => {
        console.log({id, password});
        dispatch(loginAction({ id, password }));
    }, [id, password]);
    
    return (
        <Container>
            <h2>admin login</h2>
            <br />
            <Form name="basic" labelCol={{ span: 8 }} wrapperCol={{ span: 16 }} initialValues={{ remember: true}}
                onFinish={onSubmitForm}
                autoComplete="off"
            >
                <Form.Item label="Id" name="user-id"
                    rules={[ {required: true, message: 'Please input your username!'},]}>
                <Input name='user-id' value={id} onChange={onChangeId} required/>
                </Form.Item>
                <Form.Item label="Password" name="user-password" 
                    rules={[{required: true, message: 'Please input your password!'},]}>
                <Input.Password name='user-password' value={password} onChange={onChangePassword} required/>
                </Form.Item>

                <Form.Item wrapperCol={{offset: 8, span: 16 }}>
                    <Button htmlType="submit" loading={false} >
                        로그인
                    </Button>
                    &nbsp;&nbsp;
                    <Link href='/signup'><a><Button>회원가입</Button></a></Link>
                </Form.Item>
            </Form>
        </Container>
    );
}

export default LoginForm;