import React, {useState, useCallback}from "react";
import { useSelector } from 'react-redux';

import { Button, Card, Popover, Avatar, List, Comment } from "antd";
import { EllipsisOutlined, HeartOutlined, MessageOutlined } from "@ant-design/icons";

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardContent from "./PostCardContent";

const PostCard = ({post}) => {

    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const id = useSelector((state) => state.user.me && state.user.me.id);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
      }, []);

    return (
        <div>
            <Card
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <HeartOutlined key='heart'/>,
                    <MessageOutlined key='comment' onClick={onToggleComment}/>,
                    <Popover key='more' content={(
                        <Button.Group>
                            {id && post.User.id === id 
                                ? (
                                <>
                                    <Button>수정</Button>
                                    <Button type="danger">삭제</Button>
                                </>
                            ) : <Button>신고</Button>}                           
                        </Button.Group>
                    )}>
                        <EllipsisOutlined />
                    </Popover>,
                ]}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={<PostCardContent postData={post.content}/>}
                />
            </Card>
            {commentFormOpened && (
                <>
                    <CommentForm post={post}/>
                    <List
                        header={`${post.Comments.length}개의 댓글`}
                        itemLayout='horizontal'
                        dataSource={post.Comments}
                        renderItem={(item) => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>)}
        </div>
    )
}

export default PostCard;