import { createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

export const registerUser = createAsyncThunk(
  'auth/register',
    async (userData, thunkAPI) => {
        try 
        {
          return await authService.register(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data || "Registration failed"
      );
    }
});

export const loginUser = createAsyncThunk(
  'auth/login',
    async (userData, thunkAPI) => {
        try 
        {
          return await authService.login(userData);
        } catch (error) {
            return thunkAPI.rejectWithValue(
        error.response?.data || "Login failed"
      );
    } 
});

export const logoutUser = createAsyncThunk(
  'auth/logout',
    async () => {
        authService.logout();
    }
);