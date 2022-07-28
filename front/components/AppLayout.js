import React from 'react';
import Link from 'next/link';

import styled from 'styled-components';
import {Input} from 'antd';

const MenuHead = styled.ul`
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    text-align: center;
    border-bottom: solid 1px #E2E2E2;
`;
const Item = styled.li`
    display: block;
    padding: 1em;
    font-size: 1.6rem;
    font-weight: bold;
    text-align: center;

    a{
        text-decoration: none;
        color: black;
    }
`;
const SearchInput = styled(Input.Search)`
    verticalAlign: 'middle';
    padding-left: 10px;
`;
const Container = styled.div`
    display: flex;
    justify-content: center;
    text-align: center;
`;
const AppLayout = ({children}) => {

    return(
        <div>
            <MenuHead>
                <Item>
                    <Link href='/'><a>sini</a></Link>
                </Item>
                <Item>
                    <Link href='/'><a>sini</a></Link>
                </Item>
                <Item>
                    <Link href='/profile' className='profile'><a>profile</a></Link>
                    <SearchInput enterButton/>  
                </Item>
            </MenuHead>
            <Container>
                {children}
            </Container>
        </div>
    )
}

export default AppLayout;