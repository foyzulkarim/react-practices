export default (state = [], action) => {

    console.log('3. 7. i am in postsReducer top', action);

    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS':
            console.log('8. i am in FETCH_POSTS_SUCCESS, action', action);
            return action.payload.data;
        default:
            console.log('4. nothing matched', action);
            return state;    
    }
}