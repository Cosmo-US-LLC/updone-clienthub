"use client"
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../store';
import Cookies from 'js-cookie'

interface EventState {
  events: any | [] | null;
}

const initialState: EventState = {
    events: null,
};

export const eventSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEventsEmpty: (state) => {
      state = {
        events: null
      }
    },
    setEvents: (state, action) => {
      state.events = action.payload;
    }
  },
});

export const { setEvents, setEventsEmpty } = eventSlice.actions;

// Selectors
export const selectEvent = (state: RootState) => state.event; // Adjust as per your state structure

export default eventSlice.reducer;