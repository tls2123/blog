import { HYDRATE } from "next-redux-wrapper";
import { combineReducers } from "redux";

import user from './user';
import post from './post';
//초기 데이터 
const initialState = {
    user: {
        
    },
    post: {
       
    }
};


const rootReducer = combineReducers({
    index: (state = {}, action) => {
        switch(action.type){
            case HYDRATE:
                return {...state, ...action.payload};
            default:
                return state;
        }
    },
    user,
    post,
    
});

export default rootReducer;