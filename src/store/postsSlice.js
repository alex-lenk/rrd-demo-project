import {
    createEntityAdapter,
    createSlice,
    createAsyncThunk,
} from "@reduxjs/toolkit";
import postsService from "../services/posts.service";
import { setMessage } from "./messageSlice";

export const getPosts = createAsyncThunk("posts/get", async (_, thunkAPI) => {
    try {
        const response = await postsService.get();
        return response.data;
    } catch (error) {
        const message =
            (error.response &&
                error.response.data &&
                error.response.data.message) ||
            error.message ||
            error.toString();
        thunkAPI.dispatch(setMessage(message));
        return thunkAPI.rejectWithValue();
    }
});

const postsAdapter = createEntityAdapter({
    selectId: (post) => post.id,
    sortComparer: (a, b) => {
        const date_a = Date.parse(a.attributes["publish-date"]);
        const date_b = Date.parse(b.attributes["publish-date"]);

        if (date_a > date_b) return -1;
        if (date_b < date_a) return 1;
        return 0;
    },
});
const postsSlice = createSlice({
    name: "posts",
    initialState: postsAdapter.getInitialState({
        loading: "idle",
    }),

    extraReducers: {
        [getPosts.fulfilled]: (state, action) => {
            state.loading = "succeeded";
            postsAdapter.upsertMany(state, action.payload.data);
        },
        [getPosts.rejected]: (state) => {
            state.loading = "failed";
        },
        [getPosts.pending]: (state) => {
            state.loading = "pending";
        },
    },
});
const { reducer: postsReducer, name } = postsSlice;

// Selectors
const postsSelectors = postsAdapter.getSelectors((state) => state[name]);

export const loadingStatusSelector = () => (state) => state[name].loading;
export const postsListSelector = () => (state) =>
    postsSelectors.selectAll(state);
export const postSelector = (postId) => (state) =>
    postsSelectors.selectById(state, postId);

export default postsReducer;
