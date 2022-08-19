import shortId from 'shortid';

export const initialState = {
    mainPosts: [{
        id: 1,
        User: {
            id: 1,
            nickname: 'sini',
        },
        content: '자유를 찾아서 #바다 #산 #하늘',
        Images: [{
            src: 'https://cdn.univ20.com/wp-content/uploads/2018/09/90ebd6898236551fca8422959fa2a5e0.png',
        },{
            src: 'https://a.cdn-hotels.com/gdcs/production93/d1197/eb5f6d13-549d-4513-beef-c6ca685f5610.jpg',
        }, {
            src: 'https://starwalk.space/gallery/images/the-brightest-stars/1920x1080.jpg',
        } ],
        Comments: [{
            User: {
                nickname: 'nero',
            },
            content: '푸른 하늘을 봐봐',
        }, {
            User: {
                nickname: 'star',
            },
            content: '반짝 반짝 빛나는 하늘',
        }]
    }],
    imagePaths: [], //이미지 경로
    addPostLoading: false, //게시글 추가가 완료되었을때
    addPostDone: false,
    addPostError: null,
    addCommentLoading: false,
    addCommentDone: false,
    addCommentError: null,
}

export const ADD_POST_REQUEST = 'ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'ADD_COMMENT_FAILURE';

export const addPost = (data) => ({
    type: ADD_POST_REQUEST,
    data,
})
export const addComment = (data) => ({
    type: ADD_COMMENT_REQUEST,
    data,
})

const dummyPost = (data) => ({
    id: data.id,
    content: data,
    User: {
        id: 1,
        nickname: 'hello',
    },
    Images: [],
    Comments: [],
});
const dummyComment = (data) => ({
    id: shortId.generate(),
    content: data,
    User: {
        id: 1,
        nickname: 'hello',
    },
});

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_POST_REQUEST:
            return {
                ...state,
                addPostLoading: false,
                addPostDone: false,
                addPostError: null,
            }
        case ADD_POST_SUCCESS:
            return {
                ...state,
                mainPosts: [dummyPost(action.data), ...state.mainPosts],
                addPostLoading: false,
                addPostDone: true,
            }
        case ADD_POST_FAILURE:
            return {
                ...state,
                addPostLoading: false,
                addPostError: action.error,
            }
        case ADD_COMMENT_REQUEST:
            return {
                ...state,
                addCommentLoading: false,
                addCommentDone: false,
                addCommentError: null,
            }
        case ADD_COMMENT_SUCCESS:
            //댓글을 넣기 위해서는 일단 아이디가 일치는지 찾아
            const postIndex = state.mainPosts.findIndex((v) => v.id === action.data.postId);
            const post = { ...state.mainPosts[postIndex]};
            post.Comments = [dummyComment(action.data.content), ...post.Comments];
            const mainPosts = [...state.mainPosts];
            mainPosts[postIndex] = post;
            return {
                ...state,
                mainPosts,
                addCommentLoading: false,
                addCommentDone: true,
            }
        case ADD_COMMENT_FAILURE:
            return {
                ...state,
                addCommentLoading: false,
                addCommentError: action.error,
            }
        default:
            return state;
    }
};

export default reducer;