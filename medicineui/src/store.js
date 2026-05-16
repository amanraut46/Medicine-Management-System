import { configureStore } from "@reduxjs/toolkit";
import medicineReducer from "./features/medicine/medicineSlice";
import authReducer from "./features/auths/authSlice";
const store = configureStore({
    reducer: {
        medicine: medicineReducer,
        auth: authReducer,
    },
});
export default store;