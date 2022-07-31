import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

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

export const createOrder = createAsyncThunk<OrderDetails, Partial<OrderDetails>, { state }>(
    "order/createOrder",
    async (order, { getState }) => {
        const { data } = await axios.post(`/api/orders`, order, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        return data as OrderDetails;
    }
);

export const getOrderDetails = createAsyncThunk<OrderDetails, string, { state }>(
    "order/getOrderDetails",
    async (id, { getState }) => {
        const { data } = await axios.get(`/api/orders/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        return data as OrderDetails;
    }
);

export const payOrder = createAsyncThunk<
    OrderDetails,
    { id: string; paymentResult: PaymentResult },
    { state }
>("order/payOrder", async ({ id, paymentResult }, { getState }) => {
    const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().userLogin.userInfo.token}`
        }
    });
    return data;
});

export const listOrders = createAsyncThunk<OrderDetails[], void, { state }>(
    "order/listMyOrders",
    async (_, { getState }) => {
        const { data } = await axios.get(`/api/orders/myorders`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        return data;
    }
);

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
