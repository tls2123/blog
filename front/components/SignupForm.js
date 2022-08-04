import React, {useCallback, useState} from 'react';

import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';

const Container = styled.div`
    margin-top: 10rem;
`;
const FormBlock = styled.div`
    margin-top: 1em;
    font-weight: bold;
`;

const SignupForm = (props) => {
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [id, onChangeId] = useInput('');
    const [nick, onChangeNick] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmit = () => {
        if(password !== passwordCheck){
            setPasswordError(true);
            return;
        }
    };

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
                    <label htmlFor='user-id'>아이디</label>
                    <Input name='user-id' value={id} required onChange={onChangeId} />
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
                    <Button htmlType='submit' disabled>가입하기</Button>
                </FormBlock>
            </Form>
        </Container>
    )
}

export default SignupForm;