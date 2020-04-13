import { call, put, takeEvery, all } from "redux-saga/effects";


export function* addPost(data) {
    console.log('addPost calling server to add post', data);
    try {
        const output = yield fetch('http://localhost:3001/posts', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(data.payload)
        })
            .then((response) => {
                return response.json();
            });

        console.log('addPost saga yield ADD_POST_SUCCESS with payload', output);
        yield put({ type: 'ADD_POST_SUCCESS', payload: output });
        yield put({ type: 'FETCH_POSTS' });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchAddPost() {
    console.log('b. executing watchAddPosts registering watchAddPosts when fetch_posts is called');
    yield takeEvery('ADD_POST', addPost);
}

export function* fetchPosts() {
    console.log('5. fetchPosts calling server to fetch posts');
    try {
        const output = yield fetch('http://localhost:3001/posts/search', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            referrerPolicy: 'no-referrer',
        })
            .then((response) => {
                return response.json();
            });

        console.log('6. fetchPosts saga yield FETCH_POSTS_SUCCESS with payload', output);
        yield put({ type: 'FETCH_POSTS_SUCCESS', payload: output });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchFetchPosts() {
    console.log('b. executing watchFetchPosts registering fetchPosts when fetch_posts is called');
    yield takeEvery('FETCH_POSTS', fetchPosts);
}

export function* fetchPostDetail(action) {
    console.log('5. fetchPosts calling server to fetch posts', action);
    try {
        const output = yield fetch(`http://localhost:3001/posts/${action.payload}`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            referrerPolicy: 'no-referrer',
        })
            .then((response) => {
                return response.json();
            });

        console.log('6. fetchPosts saga yield FETCH_POST_DETAIL_SUCCESS with payload', output);
        yield put({ type: 'FETCH_POST_DETAIL_SUCCESS', payload: output });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchFetchPostDetail() {
    console.log('b. executing watchFetchPostDetail registering fetchPosts when fetch_posts is called');
    yield takeEvery('FETCH_POST_DETAIL', fetchPostDetail);
}


export function* addComment({ payload }) {
    console.log('addComment', payload);
    try {
        const output = yield fetch(`http://localhost:3001/posts/${payload.postId}/comments`, {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            referrerPolicy: 'no-referrer',
            body: JSON.stringify(payload.data)
        })
            .then((response) => {
                return response.json();
            });

        console.log('addComment saga yield ADD_COMMENT_SUCCESS with payload', output);
        yield put({ type: 'ADD_COMMENTS_SUCCESS', payload: output });
        yield put({ type: 'FETCH_COMMENTS', payload: payload.postId });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchAddComment() {
    console.log('b. executing watchAddComment registering fetchPosts when fetch_posts is called');
    yield takeEvery('ADD_COMMENT', addComment);
}

export function* fetchComments(action) {
    console.log('fetchComments', action);
    try {
        const output = yield fetch(`http://localhost:3001/posts/${action.payload}/comments`, {
            method: 'GET',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            referrerPolicy: 'no-referrer',
        })
            .then((response) => {
                return response.json();
            });

        console.log('fetchComments saga yield FETCH_POSTS_SUCCESS with payload', output);
        yield put({ type: 'FETCH_COMMENTS_SUCCESS', payload: output });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchFetchComments() {
    console.log('b. executing watchFetchComments registering fetchPosts when fetch_posts is called');
    yield takeEvery('FETCH_COMMENTS', fetchComments);
}


export default function* rootSaga() {
    console.log('a. registering rootSaga');
    yield all([watchAddPost(), watchFetchPosts(), watchFetchPostDetail(), watchAddComment(), watchFetchComments()]);
};