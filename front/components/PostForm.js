import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';
import DaumPostcode from 'react-daum-postcode';

import styled from 'styled-components';
import { Form, Input, Button, Row, Col } from 'antd';

import { ADD_POST_REQUEST, UPLOAD_IMAGES_REQUEST, REMOVE_IMAGE } from '../reducers/post';
import useInput from '../hooks/useInput';


const PostForm = () => {
    const dispatch = useDispatch();
    const { imagePaths, addPostDone, addPostLoading } = useSelector((state) => state.post);
    const [text, onChangeText, setText] = useInput('');
    const [title, onChangeTitle, setTitle] = useInput('');
    const [addressNumber, setAddressNumber] = useState(''); // 주소
    const [addressDetail, setAddressDetail] = useState(''); // 상세주소
    const [isOpenPost, setIsOpenPost] = useState(false);
    const imageInput = useRef();

    useEffect(() => {
        if (addPostDone) {
            setText('');
            setTitle('');
        }
    }, [addPostDone]);

    // const onSubmit = useCallback(() => {
    //     if (!title || !title.trim()) {
    //         return alert('제목을 작성하세요.');
    //     }
    //     if (!text || !text.trim()) {
    //         return alert('게시글을 작성하세요.');
    //     }
    //     if (!addressDetail || !addressDetail.trim()) {
    //         return alert('주소을 작성하세요.');
    //     }
    //     const formData = new FormData();
    //     formPaths.forEach((p) => {
    //         formData.append('image', p);
    //     });
    //     formData.append('title', title);
    //     formData.append('content', text);
    //     formData.append('addressDetail', addressDetail);
    //     console.log(formData)
    //     return dispatch({
    //         type: ADD_POST_REQUEST,
    //         data: formData,
    //     });
    // }, [title, text, addressDetail, imagePaths]);

    const onSubmit = useCallback(() => {
        if (!text || !text.trim()) {
          return alert('게시글을 작성하세요.');
        }
        const formData = new FormData();
        imagePaths.forEach((p) => {
          formData.append('image', p);
        });
        formData.append('title', title);
        formData.append('content', text);
        formData.append('addressDetail', addressDetail);
        return dispatch({
          type: ADD_POST_REQUEST,
          data: formData,
        });
      }, [title, text, addressDetail, imagePaths]);

    const onClickOpenPost = () => {
        setIsOpenPost(!isOpenPost);
    };

    const onCompletePost = (data) => {
        console.log(data)
        let fullAddr = data.address;
        let extraAddr = '';

        if (data.addressType === 'R') {
            if (data.bname !== '') {
                extraAddr += data.bname;
            }
            if (data.buildingName !== '') {
                extraAddr += extraAddr !== '' ? `, ${data.buildingName}` : data.buildingName;
            }
            fullAddr += extraAddr !== '' ? ` (${extraAddr})` : '';
        }

        setAddressNumber(data.zonecode);
        setAddressDetail(fullAddr);
        setIsOpenPost(false);
    };

    const onChangeImages = useCallback((e) => {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image', f);
        });
        dispatch({
            type: UPLOAD_IMAGES_REQUEST,
            data: imageFormData,
        })
    })

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, [imageInput.current]);

    const onRemoveImage = useCallback((index) => () => {
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        })
    });

    //여기서 제목 내용 위치를 중앙으로 날려주어야 하는데 왜 안되는 것이냔ㅁ

    const postCodeStyle = {
        display: 'block',
        position: 'relative',
        top: '0%',
        width: '400px',
        height: '400px',
        padding: '7px',
    };

    return (
        <div>
            <Row gutter={8}>
                <Col xs={24} md={6}></Col>
                <Col xs={24} md={12}>
                    <h2>추억의 장소를 공유해봐요!</h2>
                    <br />
                    <Form style={{ margin: '10px 0 20px' }} encType='multipart/form-data' onFinish={onSubmit}>
                    
                        <Form.Item label="장소" name="title">
                            <Input value={title} onChange={onChangeTitle} name='title' maxLength={140} placeholder='장소를 적어주세요!' />
                        </Form.Item>
                        <Form.Item label="설명" name="text">
                            <Input.TextArea value={text} onChange={onChangeText} name='text' maxLength={500} placeholder='장소에 대한 설명을 적어주세요!' />
                        </Form.Item>
                        <Form.Item label="위치" name="addressDetail">
                            {isOpenPost ?
                                <div>
                                    <Button onClick={onClickOpenPost}>닫기</Button>
                                    <DaumPostcode style={postCodeStyle} onComplete={onCompletePost} />
                                </div>
                                : null}
                            <Input value={addressNumber} onClick={onClickOpenPost} name='addressNumber' maxLength={140} defaultValue={addressNumber} initialValues
                                placeholder='주소 입력을 눌러 주소를 입력해주세요!(우편번호)' />
                            <Input value={addressDetail} name='addressDetail' maxLength={140} defaultValue={addressDetail} initialValues
                                placeholder='주소 입력을 눌러 주소를 입력해주세요!(우편번호)' />
                        </Form.Item>
                        <div style={{ float: 'right' }}>
                            <input type='file' name='image' multiple hidden ref={imageInput} onChange={onChangeImages} />
                            <Button onClick={onClickImageUpload}>이미지 업로드</Button>
                            <Button type='primary' style={{ marginLeft: '20px', marginRight: '20px' }} htmlType='submit' loading={addPostLoading} onClick={() => Router.push('/new')}>올리기</Button>
                        </div>
                        <div>
                            {imagePaths.map((v, i) => (
                                <div key={v} style={{ display: 'inline-block' }}>
                                    <img src={`http://localhost:3065/${v}`} style={{ width: '200px' }} alt={v} />
                                    <div>
                                        <Button onClick={onRemoveImage(i)}>제거</Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <br/>
                    </Form>
                </Col>
                <Col xs={24} md={6}></Col>
            </Row>

        </div>

    )
}

export default PostForm;