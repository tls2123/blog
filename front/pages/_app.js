//pages들의 공통 부분
//inde.js 에 들어가는 component
import React from "react";
import Head from 'next/head'
import wrapper from "../store/configureStore";
import 'antd/dist/antd.css'

const App = ({Component}) => {
    return (
        <>
            <Head>
                <meta charSet="utf-8" />
                <title>sini Blog</title>
            </Head>
            <Component />
        </>
    )
};

export default wrapper.withRedux(App);