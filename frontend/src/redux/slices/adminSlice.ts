import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteRequest, getRequest, putRequest } from "../../client/api";

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

export const getAllUsers = createAsyncThunk<User[], void>("admin/getAllUsers", async () => {
    const { data } = await getRequest(`/api/users`);
    return data as User[];
});

export const deleteUser = createAsyncThunk<string, string>("admin/deleteUser", async (id) => {
    const { data } = await deleteRequest(`/api/users/${id}`);
    return data.message;
});

export const getUserDetails = createAsyncThunk<User, string>("admin/getUserDetails", async (id) => {
    const { data } = await getRequest(`/api/users/${id}`);
    return data as User;
});

export const updateUser = createAsyncThunk<User, User>("admin/updateUser", async (user) => {
    const { data } = await putRequest(`/api/users/${user._id}`, user);
    return data as User;
});

export const adminSlice = createSlice({
    name: "admin",
    initialState,
    reducers: {
        resetState(state) {
            state.user = null;
            state.users = [];
        }
    },
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

export const { resetState } = adminSlice.actions;
export default adminSlice.reducer;
