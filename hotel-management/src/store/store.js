import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice'; // Import karein
import roomReducer from './roomSlice';
import reservationReducer from './reservationSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer, // YEH LINE ERROR FIX KAREGI
    rooms: roomReducer,
    reservations: reservationReducer,
  },
});