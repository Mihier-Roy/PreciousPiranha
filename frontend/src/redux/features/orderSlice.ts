import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface OrderState {
    order: OrderDetails | {};
    userOrders: OrderDetails[] | [];
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: OrderState = {
    order: {},
    userOrders: [],
    loading: false,
    success: false,
    error: null
};

export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {
        createOrder: (state, action: PayloadAction<OrderDetails>) => {
            state.order = action.payload;
        },
        getOrderDetails: (state, action: PayloadAction<OrderDetails>) => {
            state.order = action.payload;
        },
        payOrder: (state, action: PayloadAction<OrderDetails>) => {
            state.order = action.payload;
        },
        listMyOrders: (state, action: PayloadAction<OrderDetails[]>) => {
            state.userOrders = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createOrderRequest.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createOrderRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(createOrderRequest.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            if (action.error.message) {
                state.error = action.error.message;
            }
        });
        builder.addCase(orderDetailsRequest.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(orderDetailsRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(orderDetailsRequest.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            if (action.error.message) {
                state.error = action.error.message;
            }
        });
        builder.addCase(payOrderRequest.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(payOrderRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(payOrderRequest.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            if (action.error.message) {
                state.error = action.error.message;
            }
        });
        builder.addCase(listOrdersRequest.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(listOrdersRequest.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        });
        builder.addCase(listOrdersRequest.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
            if (action.error.message) {
                state.error = action.error.message;
            }
        });
    }
});

export const { createOrder, getOrderDetails, payOrder, listMyOrders } = orderSlice.actions;
export default orderSlice.reducer;

export const createOrderRequest = createAsyncThunk("order/createOrder", async (order) => {
    const { data } = await axios.post(`/api/orders`, order, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().userLogin.userInfo.token}`
        }
    });
    return data;
});

export const orderDetailsRequest = createAsyncThunk("order/getOrderDetails", async (id) => {
    const { data } = await axios.get(`/api/orders/${id}`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().userLogin.userInfo.token}`
        }
    });
    return data;
});

export const payOrderRequest = createAsyncThunk("order/payOrder", async (id, paymentResult) => {
    const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().userLogin.userInfo.token}`
        }
    });
    return data;
});

export const listOrdersRequest = createAsyncThunk("order/listMyOrders", async () => {
    const { data } = await axios.get(`/api/orders/myorders`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${getState().userLogin.userInfo.token}`
        }
    });
    return data;
});
