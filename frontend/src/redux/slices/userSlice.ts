import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRequest, putRequest } from "../../client/api";
import { AppDispatch } from "../store";

interface UserProfileState {
    userDetails: UserProfile | null;
    loading: boolean;
    success: boolean;
    error: string | null;
}

const initialState: UserProfileState = {
    userDetails: null,
    loading: false,
    success: false,
    error: null
};

export const getDetails = createAsyncThunk<UserProfile, void>(
    "user/getDetails",
    async (_, { getState }) => {
        // Make a GEt request to the profiles endpint to fetch user information
        const { data } = await getRequest(`/api/users/profile`, true);
        return data as UserProfile;
    }
);

export const updateDetails = createAsyncThunk<UserProfile, UserProfile, { dispatch: AppDispatch }>(
    "user/updateDetails",
    async (user, { getState, dispatch }) => {
        const { data } = await putRequest(`/api/users/profile`, user, true);
        dispatch({ type: "auth/login/fulfilled", payload: data });
        return data as UserProfile;
    }
);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        resetUpdateProfile: (state) => {
            state.userDetails = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getDetails.pending, (state) => {
                state.loading = true;
            })
            .addCase(getDetails.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.loading = false;
                state.userDetails = action.payload;
            })
            .addCase(getDetails.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(updateDetails.pending, (state) => {
                state.loading = false;
            })
            .addCase(updateDetails.fulfilled, (state, action: PayloadAction<UserProfile>) => {
                state.loading = false;
                state.userDetails = action.payload;
                state.success = true;
            })
            .addCase(updateDetails.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
    }
});

export const { resetUpdateProfile } = userSlice.actions;
export default userSlice.reducer;
