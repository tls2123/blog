import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';

import styled from 'styled-components';
import { Form, Input, Button } from 'antd';

import { addPost } from '../reducers/post';
import useInput from '../hooks/useInput';

const PostForm = () => {
    const dispatch = useDispatch();
    const { imagePaths, addPostDone, addPostLoading } = useSelector((state) => state.post);
    const [text, onChangeText, setText] = useInput('');
    const imageInput = useRef();

    useEffect(() => {
        if(addPostDone){
            setText('');
            console.log('안되는 상황?')
        }
    }, [addPostDone]);

    const onSubmit= useCallback(() => {
        dispatch(addPost(text));
        //setText(''); 여기서 보내고 지워버리면 백에서 실패하면 글은 지워지게 된다. 그럼 글은 사라지고 반복 useEffect로
    }, [text]);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);
    
    return(
        <Form style={{ margin: '10px 0 20px' }} encType='multipart/form-data' onFinish={onSubmit}>
            <Input.TextArea value={text} onChange={onChangeText} maxLength={140} placeholder='어떤 장소를 추천하시나요?'/>
            <div>
                <input type='file' multiple hidden ref={imageInput}/>
                <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                <Button type='primary' style={{float: 'right '}} htmlType='submit' loading={addPostLoading} onClick={() => Router.push('/')}>올리기</Button>
            </div>
            <div>
                {imagePaths.map((v) => {
                    <div key={v} style={{display:'inline-block'}}>
                        <img src={v} style={{ width: '280px'}}/>
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                })}
            </div>
        </Form>
    )
}

export default PostForm;