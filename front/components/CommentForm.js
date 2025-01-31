import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button, Form, Input } from 'antd';

import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';


const CommentForm = ({post}) => {
    const dispatch = useDispatch();
    //로그인을 안하면 id가 없기 때문에 이를 대비해서 옵셔널체이닝을 꼭 해주어야 한다.
    const id = useSelector((state) => state.user.me ?. id);
    const { addCommentDone, addCommentLoading } = useSelector((state) => state.post)
    const [commentText, onChangeCommentText, setCommentText] = useInput('');

    useEffect(() => {
        if(addCommentDone){
            setCommentText('');
        }
    }, [addCommentDone])

    const onSubmitComment = useCallback(() => {
        dispatch({
            type: ADD_COMMENT_REQUEST,
            data: { content: commentText, postId: post.id, userId: id},
        });
    }, [commentText, id]);

    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item style={{ position: 'relative', margin: 0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4} />
                <Button style={{ position: 'absolute', right: 0, bottom: -40, zIndex: 1}} htmlType='submit' loading={addCommentLoading}>올리기</Button>
            </Form.Item>
        </Form>
    )
}


export default CommentForm;