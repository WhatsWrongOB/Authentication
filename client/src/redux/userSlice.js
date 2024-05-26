import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    currentUser: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        LogInSuccess: (state, action) => {
            state.currentUser = action.payload;
        },
        logOut: (state) => {
            state.currentUser = null;

        },
        deleteUserSuccess: (state) => {
            state.currentUser = null;

        },

    }
})


export const {
    LogInSuccess,
    updateUserSuccess,
    logOut,
    deleteUserSuccess
} = userSlice.actions;

export default userSlice.reducer;
