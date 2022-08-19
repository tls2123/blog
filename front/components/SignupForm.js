import React, {useCallback, useState} from 'react';

import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';

const Container = styled.div`
    margin-top: 10rem;
`;
const FormBlock = styled.div`
    margin-top: 1em;
    font-weight: bold;
`;

const SignupForm = (props) => {
    const dispatch = useDispatch();
    const { signUpLoading } = useSelector((state) => state.user);

    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [email, onChangeEmail] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmit = useCallback(() => {
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        return dispatch({ 
            type: SIGN_UP_REQUEST,
            data: {
                email,
                password,
                nick,
            },
        });
    }, [email, password, passwordCheck]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, []);
    return (
        <Container>
            <h2>admin signup</h2>
            <br />
            <Form onFinish={onSubmit}>
                <FormBlock>
                    <label htmlFor='user-email'>아이디</label>
                    <Input name='user-email' type='email' value={email} required onChange={onChangeEmail} />
                </FormBlock>
                <FormBlock>
                    <label htmlFor='user-password'>비밀번호</label>
                    <Input name='user-password' value={password} required onChange={onChangePassword}/>
                </FormBlock>
                <FormBlock>
                    <label htmlFor="user-nick">닉네임</label>
                    <Input name="user-nick" value={nick} required onChange={onChangeNick} />
                </FormBlock>
                <FormBlock>
                    <label htmlFor='user-password-check'>비밀번호체크</label>
                    <Input name='user-password-check' type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
                    {passwordError && <div style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </FormBlock>
                <br/>
                <FormBlock>
                    <Button htmlType='submit' loading={signUpLoading} disabled>가입하기</Button>
                </FormBlock>
            </Form>
        </Container>
    )
}

export default SignupForm;