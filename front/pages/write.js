import React from 'react';
import { END } from 'redux-saga';
import axios from "axios";

import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostForm';
import wrapper from '../store/configureStore';

import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const Write = () => {
    return (
        <AppLayout>
            <PostForm />
        </AppLayout>
    )
}
export const getServerSideProps = wrapper.getServerSideProps(async(context) => {
    const cookies = context.req ? context.req.headers.cookie : '';
    axios.defaults.headers.Cookie = '';
    if(context.req && cookies){
        axios.defaults.headers.Cookie = cookies;
    }
        context.store.dispatch({
            type: LOAD_MY_INFO_REQUEST,
        })
        context.store.dispatch(END);
        await context.store.sagaTask.toPromise();
  });
  



export default Write;