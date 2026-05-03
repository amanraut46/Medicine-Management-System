import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api/medicineAPI";

//Get All
export const fetchMedicines = createAsyncThunk(
  "medicines/fetchAll",
  async (attr_, { rejectWithValue }) => {
    try {
      const response = await api.get(`?sortBy=${attr_.sortBy}&sortDir=${attr_.sortDir}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);
//Get By Id
export const fetchMedicineById = createAsyncThunk(
  "medicines/fetchById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.get(`/${id}`);
        return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }  
});
//Get By name
export const fetchMedicineByName = createAsyncThunk(
  "medicines/fetchByName",
  async (name, { rejectWithValue }) => {
    try {
        console.log("Fetching medicine by name:", name);
        const response = await api.get(`/search?name=${name}`);
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data);
    }
});
//Create
export const createMedicine = createAsyncThunk(
  "medicines/create",
    async (medicineData, { rejectWithValue }) => {
        try 
        {            
            const response = await api.post("/", medicineData);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data);
        }   
});
//Update
export const updateMedicine = createAsyncThunk(
  "medicines/update",
    async ({id, medicineData}, { rejectWithValue }) => {    
        try
        {   const response = await api.put(`/${id}`, medicineData);
            return response.data;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
});
//Delete
export const deleteMedicine = createAsyncThunk(
    "medicines/delete",
    async (id, { rejectWithValue }) => {
        try {
            await api.delete(`/${id}`);
            return id;
        }
        catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);