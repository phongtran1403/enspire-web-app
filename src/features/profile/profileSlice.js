import { createSlice } from '@reduxjs/toolkit'

export const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        info: {},
    },
    reducers: {
        updateInfo: (state, action) => {
            state.info = action.payload
        },
    },
})

export const { updateInfo } = profileSlice.actions

export const selectInfo = (state) => state.profile.info

export default profileSlice.reducer