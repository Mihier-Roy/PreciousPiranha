import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface UserProfileState {
    userDetails: UserProfile | null;
    loading: boolean;
    error: string | null;
}

const initialState: UserProfileState = {
    userDetails: null,
    loading: false,
    error: null
};

export const getDetails = createAsyncThunk<UserProfile, void, { state }>(
    "user/getDetails",
    async (_, { getState }) => {
        // Make a GEt request to the profiles endpint to fetch user information
        const { data } = await axios.get(`/api/users/profile`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
        return data as UserProfile;
    }
);

export const updateDetails = createAsyncThunk<UserProfile, UserProfile, { state }>(
    "user/updateDetails",
    async (user, { getState }) => {
        const { data } = await axios.put(`/api/users/profile`, user, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${getState().userLogin.userInfo.token}`
            }
        });
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
                // dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
                // dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
                localStorage.setItem("userInfo", JSON.stringify(action.payload));
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
