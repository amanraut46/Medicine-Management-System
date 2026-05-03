import { configureStore } from "@reduxjs/toolkit";
import medicineReducer from "./features/medicine/medicineSlice";
const store = configureStore({
    reducer: {
        medicine: medicineReducer,
    },
});
export default store;