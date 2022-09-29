//pages들의 공통 부분
//inde.js 에 들어가는 component
import React from "react";
import Head from 'next/head';
import Script from 'next/script'
import wrapper from "../store/configureStore";
import 'antd/dist/antd.css';

//카카오키를 넣으려면 여기에 넣어서 불러오기

const App = ({ Component }) => {
    return (
        <>
            <Script
                src="//dapi.kakao.com/v2/maps/sdk.js?appkey=&libraries=services&autoload=false"
            />
            <Head>
                <meta charSet="utf-8" />
                <title>sini Blog</title>
            </Head>
            <Component />
        </>
    )
};

export default wrapper.withRedux(App);