import { call, put, takeEvery, all } from "redux-saga/effects";

export function* fetchPosts() {
    console.log('i am in fetchPosts');
    try {
        yield put({ type: 'FETCH_POSTS_SUCCESS', payload: [] });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchFetchPosts() {
    yield takeEvery('FETCH_POSTS', fetchPosts);
}

export default function* rootSaga() {
    console.log('i m in rootSaga');
    yield all([watchFetchPosts()]);
};