import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRequest, postRequest, putRequest } from "../../client/api";

interface OrderState {
    order: Partial<OrderDetails>;
    userOrders: OrderDetails[] | [];
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: OrderState = {
    order: {} as OrderDetails,
    userOrders: [],
    loading: false,
    success: false,
    error: null
};

export const createOrder = createAsyncThunk<OrderDetails, Partial<OrderDetails>>(
    "order/createOrder",
    async (order) => {
        const { data } = await postRequest(`/api/orders`, order, true);
        return data as OrderDetails;
    }
);

export const getOrderDetails = createAsyncThunk<OrderDetails, string>(
    "order/getOrderDetails",
    async (id) => {
        const { data } = await getRequest(`/api/orders/${id}`, true);
        return data as OrderDetails;
    }
);

export const payOrder = createAsyncThunk<
    OrderDetails,
    { id: string; paymentResult: PaymentResult }
>("order/payOrder", async ({ id, paymentResult }) => {
    const { data } = await putRequest(`/api/orders/${id}/pay`, paymentResult, true);
    return data;
});

export const listOrders = createAsyncThunk<OrderDetails[], void>("order/listMyOrders", async () => {
    const { data } = await getRequest(`/api/orders/myorders`, true);
    return data;
});

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(
                createOrder.fulfilled,
                (state, action: PayloadAction<Partial<OrderDetails>>) => {
                    state.loading = false;
                    state.success = true;
                    state.order = action.payload;
                }
            )
            .addCase(createOrder.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(getOrderDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getOrderDetails.fulfilled, (state, action: PayloadAction<OrderDetails>) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
            })
            .addCase(getOrderDetails.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(payOrder.pending, (state) => {
                state.loading = true;
            })
            .addCase(payOrder.fulfilled, (state, action: PayloadAction<OrderDetails>) => {
                state.loading = false;
                state.success = true;
                state.order = action.payload;
            })
            .addCase(payOrder.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(listOrders.pending, (state) => {
                state.loading = true;
            })
            .addCase(listOrders.fulfilled, (state, action: PayloadAction<OrderDetails[]>) => {
                state.loading = false;
                state.success = true;
                state.userOrders = action.payload;
            })
            .addCase(listOrders.rejected, (state, action) => {
                state.loading = false;
                state.success = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
    }
});

export default orderSlice.reducer;
