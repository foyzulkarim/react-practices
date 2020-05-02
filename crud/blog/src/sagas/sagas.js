import { call, put, takeEvery, all } from "redux-saga/effects";
import * as api from './api';

export function* addPost({ payload }) {
    try {
        let output = yield call(api.createPost, payload);
        yield put({ type: 'ADD_POST_SUCCESS', payload: output });
        yield put({ type: 'FETCH_POSTS' });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchAddPost() {
    yield takeEvery('ADD_POST', addPost);
}

export function* editPost({ payload }) {
    try {
        let output = yield call(api.editPost, payload);
        yield put({ type: 'EDIT_POST_SUCCESS', payload: output });
        yield put({ type: 'FETCH_POSTS' });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchEditPost() {
    yield takeEvery('EDIT_POST', editPost);
}

export function* deletePost({ payload }) {
    try {
        let output = yield call(api.deletePost, payload);
        yield put({ type: 'DELETE_POST_SUCCESS', payload: output });
        yield put({ type: 'FETCH_POSTS' });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchDeletePost() {
    yield takeEvery('DELETE_POST', deletePost);
}

export function* fetchPosts() {
    try {
        const output = yield call(api.getPosts);
        yield put({ type: 'FETCH_POSTS_SUCCESS', payload: output });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchFetchPosts() {
    yield takeEvery('FETCH_POSTS', fetchPosts);
}

export function* fetchPostDetail({ payload }) {
    try {
        const output = yield call(api.getPostDetail, payload);
        yield put({ type: 'FETCH_POST_DETAIL_SUCCESS', payload: output });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchFetchPostDetail() {
    yield takeEvery('FETCH_POST_DETAIL', fetchPostDetail);
}

export function* addComment({ payload }) {
    try {
        const output = yield call(api.createComment, payload);
        yield put({ type: 'ADD_COMMENTS_SUCCESS', payload: output });
        yield put({ type: 'FETCH_COMMENTS', payload: payload.postId });
    } catch (error) {
        console.log('fetch posts error', error);
    }
}

function* watchAddComment() {
    yield takeEvery('ADD_COMMENT', addComment);
}

export function* fetchComments({ payload }) {
    try {
        const output = yield call(api.getComments, payload);
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
    yield all([watchAddPost(), watchEditPost(), watchDeletePost(), watchFetchPosts(), watchFetchPostDetail(), watchAddComment(), watchFetchComments()]);
};