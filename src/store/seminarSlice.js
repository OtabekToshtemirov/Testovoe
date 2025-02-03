import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  seminars: [],
  loading: false,
  error: null
};

const seminarSlice = createSlice({
  name: 'seminars',
  initialState,
  reducers: {
    setSeminars: (state, action) => {
      state.seminars = action.payload;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    addSeminar: (state, action) => {
      state.seminars.push(action.payload);
    },
    updateSeminar: (state, action) => {
      const index = state.seminars.findIndex(seminar => seminar.id === action.payload.id);
      if (index !== -1) {
        state.seminars[index] = action.payload;
      }
    },
    deleteSeminar: (state, action) => {
      state.seminars = state.seminars.filter(seminar => seminar.id !== action.payload);
    }
  }
});

export const { 
  setSeminars, 
  setLoading, 
  setError, 
  addSeminar, 
  updateSeminar, 
  deleteSeminar 
} = seminarSlice.actions;

export default seminarSlice.reducer;
