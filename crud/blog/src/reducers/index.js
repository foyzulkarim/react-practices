import { combineReducers } from "redux";
import PostsReducer from "./posts";

const rootReducer = combineReducers({
    posts: PostsReducer
});

export default rootReducer;