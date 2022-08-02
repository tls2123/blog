import React, {useState} from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux'

import styled from 'styled-components';
import {HomeOutlined} from '@ant-design/icons';

const MenuHead = styled.ul`
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;

    border-bottom: solid 1px #E2E2E2;
`;
const Item = styled.li`
    display: block;
    padding: 1em;
    font-size: 1rem;
    font-weight: bold;
    text-align: center;

    a{
        text-decoration: none;
        color: black;

        &.profile{
            margin-right: 2em;
        }

    }
`;
const Container = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
`;
const AppLayout = ({children}) => {
    const me = useSelector((state) => state.user.me);

    return(
        <div>
            {me ?
            <MenuHead>
                <Item>
                    <Link href='/'><a><HomeOutlined /></a></Link>
                </Item>
                <Item>
                    <Link href='/profile'><a className='profile'>About</a></Link>
                    <Link href='/write'><a>Write</a></Link>
                </Item>
            </MenuHead>
            : 
            <MenuHead>
                <Item>
                    <Link href='/'><a><HomeOutlined /></a></Link>
                </Item>
                <Item>
                    <Link href='/profile'><a className='profile'>About</a></Link>
                    <Link href='/login'><a>Admin</a></Link>
                </Item>
            </MenuHead>
            }
            <Container>
                {children}
            </Container>
        </div>
    )
}

export default AppLayout;