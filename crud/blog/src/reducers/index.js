import { combineReducers } from "redux";
import PostsReducer from "./postsReducer";

const rootReducer = combineReducers({
    posts: PostsReducer
});

export default rootReducer;