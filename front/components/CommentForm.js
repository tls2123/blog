import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Form, Input } from 'antd';

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';


const CommentForm = ({ post }) => {
    const dispatch = useDispatch();
    const id = useSelector((state) => state.user.me?.id);
    const { addCommentDone, addCommentLoading } = ((state) => state.post)
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if(addCommentDone){
            setCommentText('');
            console.log('이번에는 댓글이니...')
        }
    }, [addCommentDone]);

    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id},
        })
    }, [commentText, id]);
    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
                <Button 
                style={{ position: "absolute", right: 0, bottom: -40, zindex: 1}}
                type="primary" htmlType="submit" loading={addCommentLoading}>올리기</Button>
            </Form.Item>
        </Form>
    )
}

export default CommentForm;