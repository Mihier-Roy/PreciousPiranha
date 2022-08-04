import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRequest } from "../../client/api";

interface CartState {
    cartItems: CartItem[];
    shippingAddress: ShippingAddress;
    paymentMethod: "PayPal" | string;
}

type AddItemType = {
    data: ProductItem;
    quantity: number;
};

const initialState: CartState = {
    cartItems: [],
    shippingAddress: {
        address: "",
        city: "",
        postalCode: "",
        country: ""
    },
    paymentMethod: "PayPal"
};

// Get product information from the API
export const addItemToCart = createAsyncThunk<AddItemType, { id: string; quantity: number }>(
    "cart/addItem",
    async ({ id, quantity }) => {
        const response = await getRequest(`/api/products/${id}`);
        return { data: response.data, quantity } as AddItemType;
    }
);

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        removeItem(state: CartState, action: PayloadAction<string>) {
            state.cartItems = state.cartItems.filter((item) => item.productID !== action.payload);
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        },
        saveShippingAddress(state: CartState, action: PayloadAction<ShippingAddress>) {
            state.shippingAddress = action.payload;
            localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
        },
        savePaymentMethod(state: CartState, action: PayloadAction<string>) {
            state.paymentMethod = action.payload;
            localStorage.setItem("paymentMethod", JSON.stringify(action.payload));
        }
    },
    extraReducers: (builder) => {
        builder.addCase(addItemToCart.fulfilled, (state, action: PayloadAction<AddItemType>) => {
            const newItem = {
                productID: action.payload.data._id,
                name: action.payload.data.name,
                image: action.payload.data.image,
                price: action.payload.data.price,
                countInStock: action.payload.data.countInStock,
                quantity: action.payload.quantity
            };
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

            // Save the cartItems array to local storage so that it may be accessed again
            // even if the user navigates away from the page
            localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        });
    }
});

export const { removeItem, saveShippingAddress, savePaymentMethod } = cartSlice.actions;
export default cartSlice.reducer;
