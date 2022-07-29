import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type CartItem = {
    name: string;
    quantity: number;
    image: string;
    price: number;
    productID: number;
};

type ShippingAddress = {
    address: string;
    city: string;
    postalCode: string;
    country: string;
};

interface CartState {
    cartItems: CartItem[];
    shippingAddress: ShippingAddress | null;
    paymentMethod: "PayPal" | string;
}

const initialState: CartState = {
    cartItems: [],
    shippingAddress: null,
    paymentMethod: "PayPal"
};

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem: (state: CartState, action: PayloadAction<CartItem>) => {
            const newItem = action.payload;
            const itemExists = state.cartItems.find((item) => item.productID === newItem.productID);
            // If the item exists, replace the item in the cart with the new item
            // Ensures any updates made will be reflected in the cart
            if (itemExists) {
                state.cartItems = state.cartItems.map((item) =>
                    item.productID === newItem.productID ? newItem : item
                );
            } else {
                state.cartItems.push(newItem);
            }
        },
        removeItem: (state: CartState, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter((item) => item.productID !== action.payload);
        },
        saveShippingAddress: (state: CartState, action: PayloadAction<ShippingAddress>) => {
            state.shippingAddress = action.payload;
        },
        savePaymentMethod: (state: CartState, action: PayloadAction<string>) => {
            state.paymentMethod = action.payload;
        }
    }
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;

// Cart Actions
export const addItemToCart = (id, quantity) => async (dispatch, getState) => {
    // Get product information from the API
    const { data } = await axios.get(`/api/products/${id}`);

    // Dispatch product information to the cartReducer where it will be added to the cartItems array
    dispatch({
        type: "cart/addItem",
        payload: {
            productID: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            quantity: quantity
        }
    });

    // Save the cartItems array to local storage so that it may be accessed again even if the user navigates away from the page
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeItemFromCart = (id) => (dispatch, getState) => {
    dispatch({ type: "cart/removeItem", payload: id });
    // Update the local storage cartItems value using the state after the product has been removed from the cart
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({ type: "cart/saveAddress", payload: data });
    localStorage.setItem("shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => (dispatch) => {
    dispatch({ type: "cart/savePaymentMethod", payload: data });
    localStorage.setItem("paymentMethod", JSON.stringify(data));
};
