import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: false,
    userData: null,
    eventData: [{
        'eventName': "Demo",
        'NoOfTickets': 0
    }]
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload.userData;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        fillEventDetail: (state, action) => {
            console.log(action.payload)
            state.eventData.push(action.payload)
        }
    }
})

export const { login, logout, fillEventDetail } = authSlice.actions;

export default authSlice.reducer;