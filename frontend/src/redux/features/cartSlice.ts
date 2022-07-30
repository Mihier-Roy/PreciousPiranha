import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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
        addItem: {
            reducer(state: CartState, action: PayloadAction<CartItem>) {
                const newItem = action.payload;
                const itemExists = state.cartItems.find(
                    (item) => item.productID === newItem.productID
                );
                // If the item exists, replace the item in the cart with the new item
                // Ensures any updates made will be reflected in the cart
                if (itemExists) {
                    state.cartItems = state.cartItems.map((item) =>
                        item.productID === newItem.productID ? newItem : item
                    );
                } else {
                    state.cartItems.push(newItem);
                }

                // Save the cartItems array to local storage so that it may be accessed again
                // even if the user navigates away from the page
                localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
            },
            prepare({ data, quantity }) {
                return {
                    payload: {
                        productID: data._id,
                        name: data.name,
                        image: data.image,
                        price: data.price,
                        countInStock: data.countInStock,
                        quantity: quantity
                    }
                };
            }
        },
        removeItem: (state: CartState, action: PayloadAction<number>) => {
            state.cartItems = state.cartItems.filter((item) => item.productID !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        saveShippingAddress: (state: CartState, action: PayloadAction<ShippingAddress>) => {
            state.shippingAddress = action.payload;
            localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
        },
        savePaymentMethod: (state: CartState, action: PayloadAction<string>) => {
            state.paymentMethod = action.payload;
            localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
        }
    }
});

export const { addItem } = cartSlice.actions;
export default cartSlice.reducer;

// Get product information from the API
export const addItemToCart = createAsyncThunk("cart/addItem", async (id, quantity) => {
    const response = await axios.get(`/api/products/${id}`);
    return { data: response.data, quantity };
});
