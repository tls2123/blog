import React, { useCallback } from "react";

import { Button, Form, Input } from 'antd';

import useInput from '../hooks/useInput';
import { useSelector } from "react-redux";

const CommentForm = ({ post }) => {
    const id = useSelector((state) => state.user.me?.id);
    const [commentText, onChangeCommentText] = useInput('');
    const onSubmitComment = useCallback(() => {
        console.log(post.id, commentText);
    }, [commentText]);
    return (
        <Form onFinish={onSubmitComment}>
            <Form.Item>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
                <Button type="primary" htmlType="submit">올리기</Button>
            </Form.Item>
            폼
        </Form>
    )
}

export default CommentForm;