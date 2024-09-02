import { configureStore } from "@reduxjs/toolkit";
import PokemonSlice from "../Slice/PokemonSlice";

const loadState = () => {
    try {
        const saveData = localStorage.getItem("listed_pokemon");
        if (saveData === null) {
            return undefined;
        }
        const parsedData = JSON.parse(saveData);
        return parsedData
    } catch (err) {
        console.error("Failed to load state from localStorage:", err);
        localStorage.removeItem("listed_pokemon");
        return undefined;
    }
};


const saveState = (state) => {
    try {
        const { bookMarks, isUserLogin } = state.PokemonSlice;
        const saveData = JSON.stringify({
            PokemonSlice: { isUserLogin, bookMarks },
        });
        localStorage.setItem("listed_pokemon", saveData);
    } catch (err) {
        console.error("Failed to save data to localStorage:", err);
    }
};


const persistedState = loadState();

export const store = configureStore({
    reducer: {
        PokemonSlice,
    },
    preloadedState: persistedState,
});

// Subscribe to store updates to save state to localStorage
store.subscribe(() => {
    saveState(store.getState());
});
