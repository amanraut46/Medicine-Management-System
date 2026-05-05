import { createSlice } from "@reduxjs/toolkit";
import { fetchMedicines, fetchMedicineById, fetchMedicineByName, createMedicine, updateMedicine,deleteMedicine } from "./medicineThunks";

const initialState = {
  medicines: [],
  selectedMedicine: null,
  loading: false,
  error: null,
};

const medicineSlice = createSlice({
    name: "medicine",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMedicines.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMedicines.fulfilled, (state, action) => {
                state.loading = false;
                state.medicines = action.payload;
            })
            .addCase(fetchMedicines.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMedicineById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMedicineById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedMedicine = action.payload;
            })
            .addCase(fetchMedicineById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(fetchMedicineByName.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMedicineByName.fulfilled, (state, action) => {
                state.loading = false;
                state.medicines = action.payload;
            })
            .addCase(fetchMedicineByName.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createMedicine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createMedicine.fulfilled, (state, action) => {
                state.loading = false;  
                state.medicines.push(action.payload);
            })
            .addCase(createMedicine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(updateMedicine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateMedicine.fulfilled, (state, action) => {
                debugger;
                state.loading = false;
                state.selectedMedicine = action.payload;
            })
            .addCase(updateMedicine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(deleteMedicine.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteMedicine.fulfilled, (state, action) => {
                state.loading = false;
                state.medicines = state.medicines.filter(med => med.id !== action.payload);
            })
            .addCase(deleteMedicine.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export default medicineSlice.reducer;