import { createSlice } from '@reduxjs/toolkit'
import { cloneDeep } from 'lodash'

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        courses: [],
        total: 0,
    },
    reducers: {
        addToCart: (state, action) => {
            const clone = cloneDeep(state.courses)
            const indexCourse = state.courses.findIndex(item => item.id === action.payload.id)
            if (indexCourse !== -1) {
                state.courses[indexCourse].amount += action.payload.amount

                return;
            }
            clone.push(action.payload)

            state.courses = clone
        }
    },
})

export const { increment, decrement, incrementByAmount } = cartSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.cart.value)`

export default cartSlice.reducer
