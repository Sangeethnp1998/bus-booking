import { createSlice } from "@reduxjs/toolkit";

function getReservationFromStore() {
  let reservations = [];
  const reservationCache = localStorage.getItem("reservations");
  if (reservationCache) {
    reservations = JSON.parse(reservationCache);
  }
  return reservations;
}
const initialState = {
  reservations: getReservationFromStore(),
};

export const reservationSlice = createSlice({
  name: "reservation",
  initialState,
  reducers: {
    addReservation(state, action) {
      const reservation = state.reservations.find(
        (reservation) => reservation.seat === action.payload.seat,
      );
      if (!reservation) {
        state.reservations.push(action.payload);
      }
    },
    updateReservation(state, action) {
      const reservation = state.reservations.find(
        (reservation) => reservation.seat === action.payload.seat,
      );
      if (reservation) {
        reservation.firstName = action.payload.firstName;
        reservation.lastName = action.payload.lastName;
        reservation.email = action.payload.email;
      }
    },
    removeReservation(state, action) {
      state.reservations = state.reservations.filter(
        (reservation) => reservation.seat != action.payload,
      );
    },
  },
});

export const reserveTikcket = (reservation, cb) => {
  return (dispatch, getState) => {
    dispatch(addReservation(reservation));
    const state = getState();
    localStorage.setItem(
      "reservations",
      JSON.stringify(state.reservation.reservations),
    );
    cb();
  };
};
export const updateTicket = (reservation, cb) => {
  return (dispatch, getState) => {
    dispatch(updateReservation(reservation));
    const state = getState();
    localStorage.setItem(
      "reservations",
      JSON.stringify(state.reservation.reservations),
    );
    cb();
  };
};
export const cancelTicket = (seat, cb) => {
  return (dispatch, getState) => {
    dispatch(removeReservation(seat));
    const state = getState();
    localStorage.setItem(
      "reservations",
      JSON.stringify(state.reservation.reservations),
    );
    cb();
  };
};

export const { addReservation, updateReservation, removeReservation } =
  reservationSlice.actions;
export const reservationReducer = reservationSlice.reducer;
