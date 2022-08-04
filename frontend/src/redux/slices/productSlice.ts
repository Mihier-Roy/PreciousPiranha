import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRequest } from "../../client/api";

interface ProductState {
    products: ProductItem[];
    product: ProductItem;
    loading: boolean;
    error: string | null;
}

const initialState: ProductState = {
    products: [],
    product: {
        _id: "",
        user: "",
        name: "",
        image: "",
        description: "",
        brand: "",
        category: "",
        price: 0,
        countInStock: 0,
        rating: 0,
        numReviews: 0,
        reviews: []
    },
    loading: false,
    error: null
};

export const listProducts = createAsyncThunk<ProductItem[], void>(
    "product/listProducts",
    async () => {
        const { data } = await getRequest(`/api/products`);
        return data as ProductItem[];
    }
);

export const listProductDetails = createAsyncThunk<ProductItem, string>(
    "product/listProductDetails",
    async (id) => {
        const { data } = await getRequest(`/api/products/${id}`);
        return data as ProductItem;
    }
);

export const productSlice = createSlice({
    name: "product",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(listProducts.pending, (state) => {
                state.loading = true;
            })
            .addCase(listProducts.fulfilled, (state, action: PayloadAction<ProductItem[]>) => {
                state.loading = false;
                state.products = action.payload;
            })
            .addCase(listProducts.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(listProductDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(listProductDetails.fulfilled, (state, action: PayloadAction<ProductItem>) => {
                state.loading = false;
                state.product = action.payload;
            })
            .addCase(listProductDetails.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
    }
});

export default productSlice.reducer;
