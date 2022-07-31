import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AdminState {
    users: User[];
    user: User | null;
    loading: boolean;
    error: string | null;
    success: boolean;
}

const initialState: AdminState = {
    users: [],
    user: null,
    loading: false,
    error: null,
    success: false
};

export const getAllUsers = createAsyncThunk<User[], void, { state }>(
    "admin/getAllUsers",
    async (_, { getState }) => {
        const { data } = await axios.get(`/api/users`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        return data as User[];
    }
);

export const deleteUser = createAsyncThunk<string, string, { state }>(
    "admin/deleteUser",
    async (id, { getState }) => {
        const { data } = await axios.delete(`/api/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        return data.message;
    }
);

export const getUserDetails = createAsyncThunk<User, string, { state }>(
    "admin/getUserDetails",
    async (id, { getState }) => {
        const { data } = await axios.get(`/api/users/${id}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        return data as User;
    }
);

export const updateUser = createAsyncThunk<User, User, { state }>(
    "admin/updateUser",
    async (user, { getState }) => {
        const { data } = await axios.put(`/api/users/${user._id}`, user, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        return data as User;
    }
);

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllUsers.pending, (state) => {
                state.loading = true;
            })
            .addCase(getAllUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
                state.loading = false;
                state.users = action.payload;
            })
            .addCase(getAllUsers.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(deleteUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteUser.fulfilled, (state) => {
                state.loading = false;
                state.success = true;
            })
            .addCase(deleteUser.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(getUserDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getUserDetails.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.user = action.payload;
            })
            .addCase(getUserDetails.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(updateUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateUser.fulfilled, (state, action: PayloadAction<User>) => {
                state.loading = false;
                state.success = true;
                state.user = action.payload;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
    }
});

export default adminSlice.reducer;
