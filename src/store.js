import { configureStore } from '@reduxjs/toolkit'
import userReducer from './Features/Auth/userSlice'
import cartReducer from './Features/Cart/cartSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer
    },
})