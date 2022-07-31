import { configureStore } from "@reduxjs/toolkit";
// import userReducer from "./features/userSlice";
import cartReducer from "./features/cartSlice";
import orderReducer from "./features/orderSlice";
import productReducer from "./features/productSlice";

// Check local storage for cartItems
// If cartItems are present, set the initial state to the values saved in local storage
const cartItems: string | null = localStorage.getItem("cartItems");
const cartItemsFromLocalStorage = cartItems != null ? JSON.parse(cartItems) : [];

// Check local storage for userInfo
// If userInfo is set, set the initial state to the values saved in local
const userInfo: string | null = localStorage.getItem("userInfo");
const userInfoFromLocalStorage = userInfo != null ? JSON.parse(userInfo) : null;

// Check local storage for shippingAddress
// If shippingAddress is set, set the initial state to the values saved in local storage
const shippingAddress = localStorage.getItem("shippingAddress");
const shippingAddressFromLocalStorage = shippingAddress ? JSON.parse(shippingAddress) : {};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        order: orderReducer,
        product: productReducer
    },
    preloadedState: {
        cart: {
            cartItems: cartItemsFromLocalStorage,
            shippingAddress: shippingAddressFromLocalStorage,
            paymentMethod: ""
        }
        // userLogin: {
        //     userInfo: userInfoFromLocalStorage
        // }
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
