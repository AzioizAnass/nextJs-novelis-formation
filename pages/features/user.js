import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { userid:"" , username: "",firstname:"" , lastname:"", email: "", age: "" ,roles:""};

const userSlice = createSlice({
    name: "user",
    initialState: { value: initialStateValue },
    reducers: {
        login: (state,action) => {
            state.value = action.payload;
        },
        logout: (state, action) => {
            state.value = initialStateValue;
        }
    }
})

export const { login,logout } = userSlice.actions;
export default userSlice.reducer