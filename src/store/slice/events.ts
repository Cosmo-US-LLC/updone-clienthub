// counterSlice.ts
import axiosCall from "@/lib/axios";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import store from "../store";

interface EventsState {
  events: any; // Change this based on user object structure
  pageNo: number;
  pageSize: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: EventsState = {
  events: null,
  pageNo: 1,
  pageSize: 100,
  status: "idle",
  error: null,
};

// 🔹 Async Thunk: Fetch user details using token
export const fetchUserEvents = createAsyncThunk(
  "events/fetchUserEvents",
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { events: EventsState }; // Access state
      const pageNo = state.events.pageNo;
      const pageSize = state.events.pageSize;

      //   if (!token) throw new Error("No token available");

      const response = await axiosCall.post("/client/events", {
        page_number: pageNo,
        page_size: pageSize,
      });

      if (response?.data?.status == 200) {
        return response?.data?.data;
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch user");
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    getEvents: (state, action: PayloadAction<any>) => {
      state.pageNo = action.payload;
      if (action.payload) {
        setTimeout(() => {
          store.dispatch(fetchUserEvents());
        }, 0);
      }
    },
    saveEvents: (state, action: PayloadAction<string>) => {
      state.events = action.payload;
    },
    // logout: (state) => {
    //   state.token = "";
    //   state.user = null;
    //   state.status = "idle";
    //   state.error = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserEvents.pending, (state) => {
        state.events = [];
        state.status = "loading";
      })
      .addCase(fetchUserEvents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.events = action.payload;
      })
      .addCase(fetchUserEvents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
        state.events = [];
      });
  },
});

export const { getEvents, saveEvents } = eventsSlice.actions;
export default eventsSlice.reducer;
