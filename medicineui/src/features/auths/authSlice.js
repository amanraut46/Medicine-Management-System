import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "./authThunk";

const token = localStorage.getItem("token");
const initialState = {
  token: token || null,
  user: null,
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
    reducers: {
        logout:(state) => {
            state.token = null;
            state.user = null;
            localStorage.removeItem("token");
            localStorage.removeItem("roles");
        },
    },
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
    })
    .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.message = action.payload;
    })
    .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
    .addCase(loginUser.pending, (state) => {
        state.isLoading = true;  
        state.isError = false;
    })
    .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.token = action.payload.token;
        state.user = {
            name: action.payload.name,
            roles: action.payload.roles,
        };
    })
    .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
    })
  },
});

export const { logout } = authSlice.actions
export default authSlice.reducer;