import { all, fork, takeLatest, call, delay, put} from 'redux-saga/effects';

import {
    LOG_IN_FAILURE,
    LOG_IN_REQUEST,
    LOG_IN_SUCCESS,
    LOG_OUT_FAILURE,
    LOG_OUT_REQUEST,
    LOG_OUT_SUCCESS,
    SIGN_UP_FAILURE,
    SIGN_UP_REQUEST,
    SIGN_UP_SUCCESS,
  } from '../reducers/user';

function logInAPI(data){
    //서버에 요청을 보내고 
    //return axios.post('api/login', data)
}
function* logIn(action){
    try{
        yield delay(1000);
        //result로 요청을 받아서 
        //logInAPI(action.data)
        //const result = yield call(logInAPI, action.data);
        yield put({
            type: LOG_IN_SUCCESS,
            data: action.data,
        });
    }catch (err){
        yield put({
            type: LOG_IN_FAILURE,
            error: err.response.data,
        });
    }
    
}
function logOutAPI(){
    //서버에 요청을 보내고 
    //return axios.post('api/login')
}
function* logOut(){
    try{
        //result로 요청을 받아서 
        //const result = yield call(logOutAPI);
        yield put({
            type: LOG_OUT_SUCCESS,
        });
    }catch (err){
        yield put({
            type: LOG_OUT_FAILURE,
            error: err.response.data,
        });
    }
    
}
function signUpAPI(){
    //서버에 요청을 보내고 
    //return axios.post('api/login', data)
}
function* signUp(){
    try{
        yield delay(1000);
        //const result = yield call(logInAPI, action.data);
        yield put({
            type: SIGN_UP_SUCCESS,
        });
    }catch (err){
        yield put({
            type: SIGN_UP_FAILURE,
            error: err.response.data,
        });
    }
    
}
//이벤트리스너의 역할 

function* watchLogIn(){
    yield takeLatest(LOG_IN_REQUEST, logIn);
}
function* watchLogOut(){
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp(){
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}
export default function* userSaga() {
    yield all ([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}