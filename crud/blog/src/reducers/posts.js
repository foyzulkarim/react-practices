export default (state = [{_id: '1', title: 'my amazing title - najim'}], action) => {

    console.log('i am in postsReducer', action);

    switch (action.type) {
        case 'FETCH_POSTS_SUCCESS':
            return action.payload;
        default:
            return state;    
    }
}