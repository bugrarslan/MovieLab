import { configureStore } from '@reduxjs/toolkit'
import favouriteFilmReducer from './slices/filmSlice'

export default configureStore({
  reducer: {
    favouriteFilms: favouriteFilmReducer,
  },
})