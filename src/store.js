import { createSlice, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

const postsSlice = createSlice({
  name: "posts",
  initialState: {
    posts: [],
  },
  reducers: {
    setPosts(state, action) {
      state.posts = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUsers(state, action) {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const usersSlice = createSlice({
  name: "users",
  initialState: {
    posts: [],
  },
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
      state.loading = false;
      state.error = null;
    },
    setUserLoading(state, action) {
      state.loading = action.payload;
    },
    setUserError(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const { setPosts, setLoading, setError } = postsSlice.actions;
export const { setUsers, setUserLoading, setUserError } = usersSlice.actions;

const store = configureStore({
  reducer: {
    posts: postsSlice.reducer,
    users: usersSlice.reducer,
  },
});

export default store;

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch(setPosts(await response.json()));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};

export const fetchUsers = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      dispatch(setUsers(await response.json()));
    } catch (error) {
      dispatch(setError(error.message));
    }
  };
};
