import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { END } from 'redux-saga';
import axios from "axios";

//component
import AppLayout from '../components/AppLayout';
import RecomendCard from '../components/RecomendCard';

import { LOAD_MY_INFO_REQUEST } from '../reducers/user';
import wrapper from '../store/configureStore';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: LOAD_MY_INFO_REQUEST,
        })
    }, []);

    return (
        <AppLayout> 
            <RecomendCard />
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

export default Home;