import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface AuthState {
    user: UserAuthData | null;
    loading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    error: null
};

export const login = createAsyncThunk("auth/login", async (loginData: LoginData) => {
    const { email, password } = loginData;
    // Make a request to the user login endpoint to retrieve the user token
    const { data } = await axios.post(
        `/api/users/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
    );
    return data;
});

export const register = createAsyncThunk("auth/register", async (registerData: RegisterData) => {
    const { name, email, password } = registerData;
    // Make a request to the registeration endpoint to register the user and retrieve a token
    const { data } = await axios.post(
        `/api/users`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
    );
    return data;
});

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
            localStorage.removeItem("userInfo");
            // TODO: Clear the following state
            // disptach({ type: USER_PROFILE_RESET });
            // disptach({ type: ORDER_USER_LIST_RESET });
            // disptach({ type: USER_LIST_CLEAR });
        },
        clearRegisterState: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.fulfilled, (state, action: PayloadAction<UserAuthData>) => {
                state.loading = false;
                state.user = action.payload;
                // Save token to local storage.
                localStorage.setItem("userInfo", JSON.stringify(action.payload));
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.fulfilled, (state, action: PayloadAction<UserAuthData>) => {
                state.loading = false;
                state.user = action.payload;
                // Save token to local storage.
                localStorage.setItem("userInfo", JSON.stringify(action.payload));
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                if (action.error.message) {
                    state.error = action.error.message;
                }
            });
    }
});

export const { logout, clearRegisterState } = authSlice.actions;
export default authSlice.reducer;
