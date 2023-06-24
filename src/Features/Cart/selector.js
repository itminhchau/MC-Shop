import { createSelector } from "@reduxjs/toolkit";

const itemCartSelector = (state) => state.cart.itemCart

export const itemCartCountSelector = createSelector(itemCartSelector, (itemCart) => {
    itemCart.reducer((count, item) => count + item.quantity, 0)
})
export const itemCartTotalSelector = createSelector(itemCartSelector, (itemCart) => {
    itemCart.reducer((total, item) => total + (item.salePrice * item.quantity), 0)
})