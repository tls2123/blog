//프로필
import React from "react";
import Link from 'next/link';
import Head from "next/head";
//component
import AppLayout from "../components/AppLayout";
//css
import styled from "styled-components";

const ProfileForm = styled.div`
    margin-top: 10em;

    a{
        text-decoration: none;
        color: green;
    }
`;

const Profile = () => {
    return(
        <>
            <Head>
                <title>profile | sini Blog</title>
            </Head>
            <AppLayout>
                <ProfileForm>
                    <h3>전반적인 틀을 보는 것을 좋아하는 프론트엔드 개발자입니다.</h3>
                    <br/>
                    <hr/>
                    <h2>About Me</h2>
                    <Link href='/'><a>git address</a></Link>
                    <br/>
                    <Link href='/'><a>blog address</a></Link>
                    <br/>
                    <br/>
                    <hr/>
                    <h2>Skill</h2>
                    <p>Javascript, React, HTML, CSS</p>
                    <br/>
                    <hr/>
                    <h2>Education</h2>
                    <p>MyongJi University (2015 .03 ~ 2020 .02) : 컴퓨터공학 학사</p>
                </ProfileForm>
            </AppLayout>
        </>
    )
}

export default Profile;