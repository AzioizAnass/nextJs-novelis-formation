import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = {token:""};

const tokenSlice = createSlice({
    name: "token",
    initialState: { value: initialStateValue },
    reducers: {
        setToken: (state,action) => {
            state.value = action.payload;
        },
        deleteToken: (state, action) => {
            state.value = initialStateValue;
        }
    }
})

export const { setToken , deleteToken } = tokenSlice.actions;
export default tokenSlice.reducer