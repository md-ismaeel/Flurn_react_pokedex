import { createSlice } from '@reduxjs/toolkit';
import React from 'react'


const initialState = {
    pokemon: ["pokemon", 12, 23]
}

const PokemonSlice = createSlice({
    name: "pokeDex",
    initialState,
    reducers: {
        setPokemon: (state, actions) => {
            state.pokemon = actions.payload || []
        }
    }
})

export const { setPokemon } = PokemonSlice.actions

export default PokemonSlice.reducer;
