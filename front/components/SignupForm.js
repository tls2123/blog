import React, {useCallback, useState, useEffect} from 'react';
import Router from 'next/router';

import { Button, Form, Input } from 'antd';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { SIGN_UP_REQUEST } from '../reducers/user';

const Container = styled.div`
    margin-top: 5em;
    text-align: center;
`;
const FormBlock = styled.div`
    margin-top: 1em;
    font-weight: bold;
`;
const InputSize = styled(Input)`
    width: 250px;
`
const Footer = styled.div`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100px;
    background-color: #1C2135;
    opacity: 0.95;
`
const SignupForm = (props) => {
    const dispatch = useDispatch();
    const { signUpLoading, signUpDone, signUpError, me } = useSelector((state) => state.user);

    useEffect(() => {
        if(!(me && me.id)){
            Router.replace('/');
        }
    }, [me && me.id]);

    useEffect(() => {
        if(signUpDone){
            Router.replace('/');
        }
    }, [signUpDone]);

    useEffect(() => {
        if (signUpError) {
          alert(signUpError);
        }
      }, [signUpError]);
      
    const [passwordCheck, setPasswordCheck] = useState('');
    const [passwordError, setPasswordError] = useState(false);

    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password, onChangePassword] = useInput('');

    const onSubmit = useCallback(() => {
        if(password !== passwordCheck){
            return setPasswordError(true);
        }
        dispatch({ 
            type: SIGN_UP_REQUEST,
            data: {
                email,
                password,
                nickname,
            },
        });
        Router.push('/')
    }, [email, password, passwordCheck]);

    const onChangePasswordCheck = useCallback((e) => {
        setPasswordError(e.target.value !== password);
        setPasswordCheck(e.target.value);
    }, [password]);
    return (
        <Container>
            <h2>회원가입</h2>
            <br />
            <Form onFinish={onSubmit}>
                <FormBlock>
                    <label htmlFor='user-email'>ID :</label> &nbsp;&nbsp;&nbsp;
                    <InputSize name='user-email' type='email' value={email} required onChange={onChangeEmail} />
                </FormBlock>
                <FormBlock>
                    <label htmlFor='user-password'>PW :</label>&nbsp;&nbsp;
                    <InputSize name='user-password' type="password" value={password} required onChange={onChangePassword}/>
                </FormBlock>
                <FormBlock>
                    <label htmlFor="user-nick">Nick :</label>&nbsp;
                    <InputSize name="user-nick" value={nickname} required onChange={onChangeNickname} />
                </FormBlock>
                <FormBlock>
                    <label htmlFor='user-password-check'>PWC :</label>&nbsp;
                    <InputSize name='user-password-check' type="password" value={passwordCheck} required onChange={onChangePasswordCheck} placeholder='비밀번호체크' />
                    {passwordError && <div style={{color: 'red'}}>비밀번호가 일치하지 않습니다.</div>}
                </FormBlock>
                <br/>
                <FormBlock>
                    <Button htmlType='submit' loading={signUpLoading}>가입하기</Button>
                </FormBlock>
            </Form>
            <Footer>
                하단에 들어갈 내용
            </Footer>
        </Container>
    )
}

export default SignupForm;