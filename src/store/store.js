import { configureStore } from "@reduxjs/toolkit";
import { reservationReducer } from "./reservation-slice";

const store = configureStore({
  reducer: {
    reservation: reservationReducer,
  },
});

export default store;
