import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";

const store = configureStore({
    reducer: {
        userReducer,
    },
    devTools: true
});
export default store;