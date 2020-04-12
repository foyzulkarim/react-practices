import { call, put, takeEvery, all } from "redux-saga/effects";

export function* fetchPosts() {
    console.log('5. fetchPosts calling server to fetch posts');
    try {
        const op = yield fetch('http://localhost:3001/posts/search', {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            referrerPolicy: 'no-referrer',
        })
            .then((response) => {
                return response.json();
            });

        console.log('6. fetchPosts saga yield FETCH_POSTS_SUCCESS with payload', op);
        yield put({ type: 'FETCH_POSTS_SUCCESS', payload: op });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchFetchPosts() {    
    console.log('b. executing watchFetchPosts registering fetchPosts when fetch_posts is called');
    yield takeEvery('FETCH_POSTS', fetchPosts);
}

export default function* rootSaga() {
    console.log('a. registering rootSaga');
    yield all([watchFetchPosts()]);
};