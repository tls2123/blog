import React from 'react';

//component
import AppLayout from '../components/AppLayout';
import PostForm from '../components/PostFrom';

const Home = () => {
    return(
        <AppLayout>
            <PostForm />
        </AppLayout>
    )
}

export default Home;