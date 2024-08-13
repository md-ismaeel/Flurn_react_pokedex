import { configureStore } from "@reduxjs/toolkit";
import PokemonSlice from "../Slice/PokemonSlice"

const loadState = () => {
    try {
        const saveData = localStorage.getItem("user");
        if (saveData === null) {
            return undefined
        }
        return JSON.parse(saveData)
    } catch (err) {
        return undefined
    }
}

const saveState = (state) => {
    try {
        const { pokemon } = state.PokemonSlice;
        const saveData = JSON.stringify({
            PokemonSlice: { pokemon }
        })
        localStorage.getItem("user", saveData)

    } catch (err) {
        console.log("failed to save data in localStorage", err);

    }
}

const persistedState = loadState()

export const store = configureStore({
    reducer: {
        PokemonSlice
    },
    preloadedState: persistedState
})

store.subscribe(() => {
    saveState(store.getState())
})