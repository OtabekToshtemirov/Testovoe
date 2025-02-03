import { configureStore } from '@reduxjs/toolkit';
import seminarReducer from './seminarSlice';

export const store = configureStore({
  reducer: {
    seminars: seminarReducer
  }
});
