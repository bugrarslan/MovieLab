import { createSlice } from '@reduxjs/toolkit'
import { act } from 'react';

const initialState = {
  value: 0,
}

export const filmSlice = createSlice({
  name: 'film',
  initialState: {
    ids: [],
  },
  reducers: {
    addFavourite(state, action) {
      state.ids.push(action.payload.id);
    },
    removeFavourite(state, action) {
      const itemId = action.payload.id;
      // state.ids.splice(state.ids.findIndex((index) => index.id === action.payload.id), 1);
      state.ids = state.ids.filter((id) => id !== itemId);
    },
  },
})

// Action creators are generated for each case reducer function
export const { addFavourite, removeFavourite } = filmSlice.actions

export default filmSlice.reducer