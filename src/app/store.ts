import { configureStore } from "@reduxjs/toolkit";
import heroesReducer from "../features/heroes/heroesSlice";

const store = configureStore({
  reducer: {
    heroes: heroesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
