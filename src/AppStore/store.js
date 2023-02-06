import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../Features/data";

const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});

export default store;
