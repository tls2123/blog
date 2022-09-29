import React, { useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import Link from 'next/link';

import { Button, Card, Popover, Avatar, List, Comment, Row, Col } from "antd";
import { EllipsisOutlined, HeartOutlined, HeartTwoTone, MessageOutlined } from "@ant-design/icons";

import PostImages from './PostImages';
import CommentForm from './CommentForm';
import PostCardGroup from "./PostCardGroup";
import { LIKE_POST_REQUEST, UNLIKE_POST_REQUEST, REMOVE_POST_REQUEST, UPDATE_POST_REQUEST } from "../reducers/post";

const PostCard = ({ post }) => {
    const dispatch = useDispatch();
    const { removePostLoading } = useSelector((state) => state.post);
    const [commentFormOpened, setCommentFormOpened] = useState(false);
    const id = useSelector((state) => state.user.me && state.user.me.id);
    const [editMode, setEditMode] = useState(false);

    const onClickUpdate = useCallback(() => {
        setEditMode(true);
    }, []);
    const onCancelUpdata = useCallback(() => {
        setEditMode(false);
    }, []);
    const onChangePost = useCallback((editTitle ,editText) => () => {
        dispatch({
            type: UPDATE_POST_REQUEST,
            data: {
                PostId: post.id,
                title: editTitle,
                content: editText,
            },
        })
    }, [post]);

    const onLike = useCallback(() => {
        dispatch({
            type: LIKE_POST_REQUEST,
            data: post.id,
        })
    }, []);
    const onUnLike = useCallback(() => {
        dispatch({
            type: UNLIKE_POST_REQUEST,
            data: post.id,
        })
    }, []);

    const onToggleComment = useCallback(() => {
        setCommentFormOpened((prev) => !prev);
    }, []);

    const onRemovePost = useCallback(() => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: post.id,
        })
    }, []);

    const liked = post.Likers.find((v) => v.id === id);
    return (
        <div>
            <Row gutter={8}>
                <Col xs={24} md={3}>

                </Col>
                <Col xs={24} md={18}>
                    <Card
                        cover={post.Images[0] && <PostImages images={post.Images} />}
                        actions={[
                            liked 
                            ? <HeartTwoTone twoToneColor='#eb2f96' key='heart' onClick={onUnLike}/>
                            : <HeartOutlined key='heart' onClick={onLike}/>,
                            <MessageOutlined key='comment' onClick={onToggleComment} />,
                            <Popover key='more' content={(
                                <Button.Group>
                                    {id && post.User.id === id
                                        ? (
                                            <>
                                                <Button onClick={onClickUpdate}>수정</Button>
                                                <Button type="danger" onClick={onRemovePost}>삭제</Button>
                                            </>
                                        ) : <Button>신고</Button>}
                                </Button.Group>
                            )}>
                                <EllipsisOutlined />
                            </Popover>,
                        ]}
                    >
                        <Card.Meta
                            avatar={<Link href={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                            title={post.User.nickname}
                            description={
                                <PostCardGroup editMode={editMode} postTitle={post.title} postAddress={post.addressDetail} postContent={post.content}
                                 onCancelUpdata={onCancelUpdata} onChangePost={onChangePost} />}
                        />
                    </Card>
                    {commentFormOpened && (
                        <>
                            <CommentForm post={post} />
                            <List
                                header={`${post.Comments.length}개의 댓글`}
                                itemLayout='horizontal'
                                dataSource={post.Comments}
                                renderItem={(item) => (
                                    <li>
                                        <Comment
                                            author={item.User.nickname}
                                            avatar={<Link href={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                                            content={item.content}
                                        />
                                    </li>
                                )}
                            />
                        </>)}
                </Col>
                <Col xs={24} md={3}>

                </Col>

            </Row>
        </div>
    )
}

export default PostCard;