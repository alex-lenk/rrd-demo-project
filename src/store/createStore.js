import authReducer from "./authSlice";
import messageReducer from "./messageSlice";
import postsReducer from "./postsSlice";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    auth: authReducer,
    message: messageReducer,
    posts: postsReducer,
});

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    });
}
