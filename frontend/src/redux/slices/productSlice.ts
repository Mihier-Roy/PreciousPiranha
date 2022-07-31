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

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {
        listProducts: (state, action: PayloadAction<ProductItem[]>) => {
            state.products = action.payload;
        },
        listProductDetails: (state, action: PayloadAction<ProductItem>) => {
            state.product = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(listProductRequest.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(listProductRequest.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(listProductRequest.rejected, (state, action) => {
            state.loading = false;
            if (action.error.message) {
                state.error = action.error.message;
            }
        });
        builder.addCase(listProductDetailsRequest.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(listProductDetailsRequest.fulfilled, (state, action) => {
            state.loading = false;
        });
        builder.addCase(listProductDetailsRequest.rejected, (state, action) => {
            state.loading = false;
            if (action.error.message) {
                state.error = action.error.message;
            }
        });
    }
});

export const { listProducts, listProductDetails } = productSlice.actions;
export default productSlice.reducer;

export const listProductRequest = createAsyncThunk("product/listProducts", async () => {
    const { data } = await axios.get(`/api/products`);
    return data;
});

export const listProductDetailsRequest = createAsyncThunk(
    "product/listProductDetails",
    async (id) => {
        const { data } = await axios.get(`/api/products/${id}`);
        return data;
    }
);
