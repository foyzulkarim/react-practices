import { call, put, takeEvery, all } from "redux-saga/effects";

export function* fetchPosts() {
    console.log('i am in fetchPosts');
    try {
        const posts = yield call(
            fetch('http://localhost:3001/posts/search', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                headers: {
                    'Content-Type': 'application/json'
                },
                referrerPolicy: 'no-referrer', // no-referrer, *client
            })
        );
        yield put({ type: 'FETCH_POSTS_SUCCESS', posts });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchFetchPosts() {
    yield takeEvery('FETCH_POSTS', fetchPosts);
}

export default function* rootSaga() {
    console.log('i m in rootSaga');
    yield all([watchFetchPosts]);
};