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
    postAdded: false, //게시글 추가가 완료되었을때
}

const ADD_POST = 'ADD_POST';

export const addPost = {
    type: ADD_POST,
}

const dummyPost = {
    id: 2,
    content: '더미데이터',
    User: {
        id: 1,
        nickname: 'hello',
    },
    Images: [],
    Comments: [],
};

const reducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_POST:
            return {
                ...state,
                mainPosts: [dummyPost, ...state.mainPosts],
                postAdded: true,
            }
        default:
            return state;
    }
};

export default reducer;