import React, {useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { END } from 'redux-saga';
import axios from "axios";

//component
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';
import wrapper from '../store/configureStore';

import { LOAD_POSTS_REQUEST } from '../reducers/post'; 
import { LOAD_MY_INFO_REQUEST } from '../reducers/user';

const New = () => {
    const dispatch = useDispatch();
    const { mainPosts, hasMorePosts, loadPostsLoading } = useSelector(state => state.post);

    useEffect(() => {
        dispatch({
          type: LOAD_POSTS_REQUEST,
        });
      }, []);

    useEffect(() => {
        function onScroll() {
          if (window.pageYOffset + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePosts && !loadPostsLoading) {
              const lastId = mainPosts[mainPosts.length - 1]?.id;
              dispatch({
                type: LOAD_POSTS_REQUEST,
                lastId,
              });
            }
          }
        }
        window.addEventListener('scroll', onScroll);
        return () => {
          window.removeEventListener('scroll', onScroll);
        };
      }, [hasMorePosts, loadPostsLoading, mainPosts]);
    

    return (
        <AppLayout>
            {mainPosts.map((post) => {
                return (
                    <PostCard key={post.id} post={post} />
                );
            })}
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
      context.store.dispatch({
          type: LOAD_POSTS_REQUEST,
      })
      context.store.dispatch(END);
      await context.store.sagaTask.toPromise();
});


export default New;