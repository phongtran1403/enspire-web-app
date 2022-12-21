import { configureStore } from '@reduxjs/toolkit';
import cartReducer from 'features/cart/cartSlice'
import profileReducer from 'features/profile/profileSlice'

export default configureStore({
    reducer: {
        cart: cartReducer,
        profile: profileReducer
    },
});
