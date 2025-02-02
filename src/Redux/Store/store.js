import { configureStore } from "@reduxjs/toolkit";
import PokemonSlice from "../../Redux/Slice/PokemonSlice";
import throttle from "lodash.throttle"; // Import Lodash throttle

const STORAGE_KEY = "listed_pokemon";

const loadState = () => {
  try {
    const saveData = localStorage.getItem(STORAGE_KEY);
    return saveData ? JSON.parse(saveData) : {};
  } catch (err) {
    console.error("Failed to load state from localStorage:", err);
    localStorage.removeItem(STORAGE_KEY);
    return {};
  }
};

const saveState = (state) => {
  try {
    const { bookMarks, isLogin } = state.pokeDex; // Fix key reference
    const saveData = JSON.stringify({ pokeDex: { isLogin, bookMarks } });
    localStorage.setItem(STORAGE_KEY, saveData);
  } catch (err) {
    console.error("Failed to save data to localStorage:", err);
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    pokeDex: PokemonSlice,
  },
  preloadedState: persistedState,
});

// Optimize save using throttle to limit frequent writes
store.subscribe(throttle(() => saveState(store.getState()), 2000));
