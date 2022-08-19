import { all, fork, takeLatest, delay, call, put} from 'redux-saga/effects';

import {
    ADD_COMMENT_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_POST_FAILURE,
    ADD_POST_REQUEST,
    ADD_POST_SUCCESS,
} from '../reducers/post';

function addPostAPI(data){
    //서버에 요청을 보내고 
    //return axios.post('api/post', data);
}
function* addPost(action){
    try{
        //result로 요청을 받아서 
        //const result = yield call(AddPostAPI, action.data);
        yield put({
            type: ADD_POST_SUCCESS,
            data: action.data,
        });
    }catch (err){
        yield put({
            type: ADD_POST_FAILURE,
            data: err.response.data,
        });
    }
    
}
function addCommentAPI(data){
    //서버에 요청을 보내고 
    //return axios.post('api/post${data.postId}/comment', data);
}
function* addComment(action){
    try{
        //result로 요청을 받아서 
        //const result = yield call(AddPostAPI, action.data);
        yield put({
            type: ADD_COMMENT_SUCCESS,
            data: action.data,
        });
    }catch (err){
        yield put({
            type: ADD_COMMENT_FAILURE,
            data: err.response.data,
        });
    }
    
}

function* watchAddPost(){
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment(){
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

export default function* postSaga() {
    yield all ([
        fork(watchAddPost),
        fork(watchAddComment),
    ])
}