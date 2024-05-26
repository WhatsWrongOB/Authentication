import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
    post: [],
    singlePost: [],
    error: ''
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        getDataRequest: (state) => {
            state.loading = true;
        },
        getDataSuccess: (state, action) => {
            state.loading = false;
            state.post = action.payload;
        },
        getDataFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        getSingleDataSuccess: (state, action) => {
            state.singlePost = action.payload;
        },
    }
});

export const { getDataSuccess, getDataRequest, getDataFailure, getSingleDataSuccess } = postSlice.actions;

