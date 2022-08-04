import React from 'react';
import { useSelector } from 'react-redux';

//component
import AppLayout from '../components/AppLayout';
import PostCard from '../components/PostCard';


const Home = () => {
    const { mainPosts } = useSelector(state => state.post);

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

export default Home;