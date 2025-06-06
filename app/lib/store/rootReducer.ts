import { combineReducers } from "@reduxjs/toolkit";
import staffReducer from "./features/staffSlice"; // Assuming staffReducer is correctly defined in './features/staff'
import authReducer from "./features/authSlice";
import bookingSlice from "./features/bookingSlice";
import jobCreateReducer from "./features/jobCreateSlice";
import eventReducer from "./features/eventSlice";

const rootReducer = combineReducers({
  staff: staffReducer,
  auth: authReducer,
  booking: bookingSlice,
  jobCreate: jobCreateReducer,
  event: eventReducer,
});

export default rootReducer;
