import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ProductState {
    products: ProductItem[];
    product: ProductItem | {};
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    product: {},
    loading: false,
    error: null
};

export const listProducts = createAsyncThunk<ProductItem[], void>(
    "product/listProducts",
    async () => {
        const { data } = await axios.get(`/api/products`);
        return data as ProductItem[];
    }
);

export const listProductDetails = createAsyncThunk<ProductItem, string>(
    "product/listProductDetails",
    async (id) => {
        const { data } = await axios.get(`/api/products/${id}`);
        return data as ProductItem;
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(listProducts.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(listProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        });
        builder.addCase(listProducts.rejected, (state, action) => {
            state.loading = false;
            if (action.error.message) {
                state.error = action.error.message;
            }
        });
        builder.addCase(listProductDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(listProductDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload;
        });
        builder.addCase(listProductDetails.rejected, (state, action) => {
            state.loading = false;
            if (action.error.message) {
                state.error = action.error.message;
            }
        });
    }
});

export default productSlice.reducer;
