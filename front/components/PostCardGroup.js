import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {Input, Button} from 'antd';
import { useSelector } from "react-redux";

const {TextArea} = Input;

import PostCardTitle from './PostCardTitle';
import PostCardContent from './PostCardContent';
import PostCardLoca from './PostCardLoca';

const PostCardGroup = ({postTitle, postAddress ,postContent, editMode, onCancelUpdata, onChangePost}) => {
    const [editTitle, setEditTitle] = useState(postTitle);
    const [editText, setEditText] = useState(postContent);
    const { updatePostLoading, updatePostDone } = useSelector( state => state.post)

    useEffect(() => {
        if(updatePostDone){
            onCancelUpdata();
        }
    }, [updatePostDone]);

    const onChangeTitle = useCallback((e) => {
        setEditTitle(e.target.value);
    });
    const onChangeText = useCallback((e) => {
        setEditText(e.target.value);
    });
    return (
        <div>
            {editMode
                ? (
                    <>
                   
                        <Input value={editTitle} onChange={onChangeTitle}/>
                        <TextArea value={editText} onChange={onChangeText}/>
                    
                        <Button.Group>
                            <Button loading={updatePostLoading} onClick={onChangePost(editTitle, editText)}>수정</Button>
                            <Button type="dander" onClick={onCancelUpdata}>취소</Button>
                        </Button.Group>
                    </>
                )
                :
                <div>
                    <PostCardTitle postTitle={postTitle} />
                    <PostCardLoca postAddress={postAddress} />
                    <PostCardContent postContent={postContent} />
                </div>
            }
        </div>
    )
}

export default PostCardGroup;