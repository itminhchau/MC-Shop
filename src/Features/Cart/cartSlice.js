import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        showCart: false,
        itemCart: []
    },
    reducers: {
        showMiniCart: (state) => {
            state.showCart = true
        },
        hideMinicart: (state) => {
            state.showCart = false
        },
        addTocart: (state, action) => {
            const newItem = action.payload
            const index = state.itemCart.findIndex((x) => x.id === newItem.id)
            if (index >= 0) {
                state.itemCart[index].quantity = newItem.quantity
            } else {
                state.itemCart[index].quantity += newItem.quantity
            }
        },
        setQuantity: (state, action) => {
            const { id, quantity } = action.payload;
            const index = state.itemCart.findIndex((x) => x.id === id)
            if (index >= 0) {
                state.itemCart[index].quantity = quantity
            }
        },
        removeItemCart: (state, action) => {
            const { id } = action.payload;
            state.itemCart = state.itemCart.filter(x => x.id !== id)
        }
    }
})

export const { actions, reducer } = cartSlice
export const { showMiniCart, hideMinicart } = actions
export default reducer