import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:5000/reservations';

// --- THUNKS ---

// Fetch all reservations
export const fetchReservations = createAsyncThunk(
  'reservations/fetch', 
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch reservations");
    }
  }
);

// Add a new reservation
export const addReservation = createAsyncThunk(
  'reservations/add', 
  async (newBooking, { rejectWithValue }) => {
    try {
      const response = await axios.post(API_URL, newBooking);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to create reservation");
    }
  }
);

// Update an existing reservation
export const updateReservation = createAsyncThunk(
  'reservations/update',
  async (updatedData, { rejectWithValue }) => {
    try {
      // Use PATCH to only update the fields that changed
      const response = await axios.patch(`${API_URL}/${updatedData.id}`, updatedData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update reservation");
    }
  }
);

// Cancel/Delete a reservation
export const cancelReservation = createAsyncThunk(
  'reservations/cancel', 
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      return id; 
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to cancel reservation");
    }
  }
);

// --- SLICE ---

const reservationSlice = createSlice({
  name: 'reservations',
  initialState: { 
    data: [], 
    loading: false, 
    error: null 
  },
  reducers: {
    clearReservationError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Reservations
      .addCase(fetchReservations.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchReservations.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchReservations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Add Reservation
      .addCase(addReservation.fulfilled, (state, action) => {
        state.data.push(action.payload);
      })

      // Update Reservation
      .addCase(updateReservation.fulfilled, (state, action) => {
        const index = state.data.findIndex(res => res.id === action.payload.id);
        if (index !== -1) {
          state.data[index] = action.payload;
        }
      })
      .addCase(updateReservation.rejected, (state, action) => {
        state.error = action.payload;
      })

      // Cancel Reservation
      .addCase(cancelReservation.fulfilled, (state, action) => {
        state.data = state.data.filter((res) => res.id !== action.payload);
      });
  },
});

export const { clearReservationError } = reservationSlice.actions;
export default reservationSlice.reducer;