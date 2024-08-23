import { createSlice } from '@reduxjs/toolkit';
import React from 'react'


const initialState = {
    pokemon: [],
    searchByNamePokemon: []
}

const PokemonSlice = createSlice({
    name: "pokeDex",
    initialState,
    reducers: {
        setPokemon: (state, actions) => {
            state.pokemon = actions.payload || []
        },
        setSearchByNamePokemon: (state, actions) => {
            state.searchByNamePokemon = actions.payload || []
        }
    }
})

export const { setPokemon, setSearchByNamePokemon } = PokemonSlice.actions
export default PokemonSlice.reducer;
