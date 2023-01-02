import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import cartApi from 'api/cart'
import { cloneDeep } from 'lodash'
import { toast } from 'react-toastify'
import { getUser } from 'utils/'

const calculateTotal = (list) => {
    let total = 0
    list && list.map(item => total += item?.amount)

    return total
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        list: [],
        total: 0,
    },
    reducers: {
        updateCart: (state, action) => {
            state.list = action.payload
            state.total = calculateTotal(state.list)
        },
        deleteCart: (state, action) => {
            const index = state.list.findIndex(item => item.idCart === action.payload)
            if (index !== -1) {
                state.list.splice(index, 1)
                state.total = calculateTotal(state.list)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addToCart.fulfilled, (state, action) => {
                const { payload } = action
                const clone = cloneDeep(state.list)
                switch (payload.type) {
                    case 'new':
                        clone.push(payload.list)
                        state.list = clone
                        state.total = calculateTotal(clone)
                        break;
                    default:
                        state.list[payload.index].amount += payload.amount
                        state.total = calculateTotal(state.list)
                        break;
                }
            })
            .addCase(getListCart.fulfilled, (state, action) => {
                state.list = action.payload
                state.total = calculateTotal(action.payload)
            })

    },
})

export const { updateCart, deleteCart } = cartSlice.actions

export const getListCart = createAsyncThunk(
    'cart/getListCart',
    async (payload, { dispatch }) => {
        const res = await cartApi.getAll()
        return res
    }
)

export const addToCart = createAsyncThunk(
    'cart/addToCart',
    async (payload, { getState }) => {
        const { cart } = getState()
        const { id, amount } = payload
        const index = cart.list.findIndex(item => item.idCourse == id)
        if (index !== -1) {
            try {
                await cartApi.update({
                    idCart: cart.list[index].idCart,
                    idCourse: id,
                    amount: cart.list[index].amount + amount,
                    userId: getUser().userId
                })
                toast.success('Added to cart')
                return {
                    type: 'update',
                    amount,
                    index
                }
            } catch (error) {
                toast.error('Add to cart failed!')
            }
        } else {
            try {
                const { idCart } = await cartApi.add({
                    idCourse: id,
                    amount,
                    userId: getUser().userId
                })
                toast.success('Added to cart')
                return {
                    type: 'new',
                    list: {
                        ...payload,
                        idCart: Number(idCart)
                    }
                }
            } catch (error) {
                toast.error('Add to cart failed!')
            }
        }
    }
)

export const selectListCart = (state) => state.cart.list
export const selectAmountCart = (state) => state.cart.total

export default cartSlice.reducer
