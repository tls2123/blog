import { HYDRATE } from "next-redux-wrapper";
//초기 데이터 
const initialState = {
    user: {
        me: false,
        user: null,
        signUpData: {},
        loginData: {},
    },
    post: {
        mainPosts: [],
    }
};

export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}
const rootReducer = (state = initialState, action) => {
    switch(action.type){
        case HYDRATE:
            return {...state, ...action.payload};
        case 'LOG_IN':
            return {
                ...state,
                user: {
                    ...state.user,
                    me: true,
                    user: action.data,
                },
            };
        default:
            return state;
    }
};

export default rootReducer;