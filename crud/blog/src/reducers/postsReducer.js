const initialState = {
    postList: [],
    selectedPost: {},
    selectedComments: [],
    notificationText: ''
};

export default (state = initialState, action) => {

    console.log('3. 7. i am in postsReducer top', action);

    switch (action.type) {

        case 'ADD_POST_SUCCESS':
            console.log('8. i am in ADD_POST_SUCCESS, action', action, state);
            return {
                ...state,
                notificationText: 'Post added successfully'
            };
        case 'FETCH_POSTS_SUCCESS':
            console.log('8. i am in FETCH_POSTS_SUCCESS, action', action, state);
            return {
                ...state,
                postList: action.payload.data,
                notificationText: ''
            };
        case 'FETCH_POST_DETAIL_SUCCESS':
            console.log('8. i am in FETCH_POST_DETAIL_SUCCESS, action', action, state);
            return {
                ...state,
                selectedPost: action.payload.data
            };
        case 'ADD_COMMENT_SUCCESS':
            console.log('8. i am in ADD_COMMENT_SUCCESS, action', action, state);
            return {
                ...state,
                notificationText: 'Comment added successfully'
            };
        case 'FETCH_COMMENTS_SUCCESS':
            console.log('8. i am in FETCH_COMMENTS_SUCCESS');
            if (action.payload.data == null) {
                action.payload.data = [];
            }
            
            return {
                ...state,
                selectedComments: action.payload.data,
                notificationText: ''
            }
        default:
            console.log('4. nothing matched', action);
            return state;
    }
}