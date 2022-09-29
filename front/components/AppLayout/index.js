import React, { useCallback, useEffect } from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'

import Router from 'next/router';

import { HomeOutlined, ProfileOutlined, UnorderedListOutlined } from '@ant-design/icons';
import { NAV, LOGO, UL, LI, BTN, Container, Btn} from './styles'

import { logoutRequestAction } from '../../reducers/user';


const AppLayout = ({ children }) => {
    const dispatch = useDispatch();
    const { me, logOutLoading } = useSelector((state) => state.user);

    const onLogOut = useCallback(() => {
        dispatch(logoutRequestAction())
    }, []);

    return (
        <div>
            {me ?
                <NAV>
                    <LOGO>
                        <Link href='/'><a><HomeOutlined style={{color: 'black'}}/></a></Link>
                    </LOGO>
                    <Link href='/'><a><BTN><UnorderedListOutlined /></BTN></a></Link>
                    <UL>
                        <LI>
                            <Link href='/new'><a>New</a></Link>
                        </LI>
                        <LI>
                            <Link href='/write'><a>Write</a></Link>
                        </LI>
                        <LI>
                            <Btn onClick={onLogOut} loading={logOutLoading}>Logout</Btn>
                        </LI>
                        <LI>
                            <Link href='/profile'><a><ProfileOutlined /></a></Link>
                        </LI>
                    </UL>
                </NAV>
                :
                <NAV>
                    <LOGO>
                        <Link href='/'><a><HomeOutlined style={{color: 'black'}}/></a></Link>
                    </LOGO>
                    <Link href='/'><a><BTN><UnorderedListOutlined /></BTN></a></Link>
                    <UL>
                        <LI>
                            <Link href='/new'><a>New</a></Link>
                        </LI>
                        <LI>
                            <Link href='/login'><a>Login</a></Link>
                        </LI>
                        <LI>
                            <Link href='/profile'><a><ProfileOutlined /></a></Link>
                        </LI>
                    </UL>
                    
                </NAV>
            }
            <hr style={{opacity: '0.5'}}/>
            <Container>
                {children}
            </Container>
            
        </div>
    )
}

export default AppLayout;