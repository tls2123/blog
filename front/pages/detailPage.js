import React from "react";
import { useSelector } from "react-redux";

import AppLayout from "../components/AppLayout";
import DetailPage from "../components/DetailPage";

const detailPage = () => {
    const [{title}] = useSelector((state) => state.post.mainPosts);
    const [{content}] = useSelector((state) => state.post.mainPosts);
    const [{Images}] = useSelector((state) => state.post.mainPosts);

    //console.log(title)
    return(
        <AppLayout>
            <DetailPage postTitle={title} postContent={content} postImage={Images} />
        </AppLayout>
    )
}

export default detailPage;