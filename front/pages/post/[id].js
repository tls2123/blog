//[id]  id가 계속 변화 공유를 할때 게시물마다 주소를 가지고 공유를 해주어야 함으로 -다이나믹 라우팅
import React from 'react';
import { useSelector } from 'react-redux';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { END } from 'redux-saga';

import axios from 'axios';
import { LOAD_POST_REQUEST } from '../../reducers/post';
import wrapper from '../../store/configureStore';
import PostCard from '../../components/PostCard';
import AppLayout from '../../components/AppLayout';
import { LOAD_MY_INFO_REQUEST } from '../../reducers/user';


const Post = () => {
    const router = useRouter();
    const { id } = router.query;
    const { singlePost } = useSelector((state) => state.post);

    return (
        <AppLayout>
            <Head>
                <title>
                    {singlePost.User.nickname}
                    님의 글
                </title>
                <meta name="description" content={singlePost.content} />
                <meta property="og:title" content={`${singlePost.User.nickname}님의 게시글`} />
                <meta property="og:description" content={singlePost.content} />
                <meta property="og:image" content={singlePost.Images[0] ? singlePost.Images[0].src : 'https://nodebird.com/favicon.ico'} />
                <meta property="og:url" content={`https://nodebird.com/post/${id}`} />
            </Head>
            <PostCard post={singlePost} />
        </AppLayout>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
    const cookie = context.req ? context.req.headers.cookie : '';
    console.log(context);
    axios.defaults.headers.Cookie = '';
    if (context.req && cookie) {
      axios.defaults.headers.Cookie = cookie;
    }
    context.store.dispatch({
      type: LOAD_MY_INFO_REQUEST,
    });
    context.store.dispatch({
      type: LOAD_POST_REQUEST,
      data: context.params.id,
    });
    context.store.dispatch(END);
    await context.store.sagaTask.toPromise();
    return { props: {} };
  });

export default Post;