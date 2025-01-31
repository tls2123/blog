import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Avatar, Button, Card, Input, Col, Row } from 'antd';
import { END } from 'redux-saga';
import Head from 'next/head';
import { useRouter } from 'next/router';

import axios from 'axios';
import { LOAD_USER_POSTS_REQUEST } from '../../reducers/post';
import { LOAD_MY_INFO_REQUEST, LOAD_USER_REQUEST, CHANGE_NICKNAME_REQUEST } from '../../reducers/user';
import PostCard from '../../components/PostCard';
import wrapper from '../../store/configureStore';
import AppLayout from '../../components/AppLayout';
import useInput from '../../hooks/useInput';

const User = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector((state) => state.post);
  const { userInfo, me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
        if (hasMorePosts && !loadPostsLoading) {
          dispatch({
            type: LOAD_USER_POSTS_REQUEST,
            lastId: mainPosts[mainPosts.length - 1] && mainPosts[mainPosts.length - 1].id,
            data: id,
          });
        }
      }
    };
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [mainPosts.length, hasMorePosts, id, loadPostsLoading]);

  const onSubmit = useCallback(() => {
    dispatch({
        type: CHANGE_NICKNAME_REQUEST,
        data: nickname,
    });
}, [nickname]);

  return (
    <AppLayout>
      {userInfo && (
        <Head>
          <title>
            {userInfo.nickname}
            님의 글
          </title>
          <meta name="description" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:title" content={`${userInfo.nickname}님의 게시글`} />
          <meta property="og:description" content={`${userInfo.nickname}님의 게시글`} />
        </Head>
      )}
      {userInfo && (userInfo.id !== me?.id)
        ? null
        :
        (
          <Row gutter={8}>
            <Col xs={24} md={3}>
            </Col>
            <Col xs={24} md={18}>
              <Card>
                <Input.Group>
                  <h3>nickname 변경</h3>
                  <br/>
                  <Input style={{ width: 'calc(100% - 200px)' }} defaultValue={nickname} onChange={onChangeNickname}/>
                  <Button onClick={onSubmit}>변경</Button>
                </Input.Group>
              </Card>
            </Col>
            <Col xs={24} md={3}>
            </Col>
          </Row>
        )}
      {mainPosts.map((post) => <PostCard key={post.id} post={post} />)}
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_USER_POSTS_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch({
    type: LOAD_USER_REQUEST,
    data: context.params.id,
  });
  context.store.dispatch(END);
  await context.store.sagaTask.toPromise();
  return { props: {} };
});

export default User;