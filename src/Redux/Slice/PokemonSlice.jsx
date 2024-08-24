import { createSlice } from "@reduxjs/toolkit";
import React, { act } from "react";

const initialState = {
    pokemon: [],
    searchByNamePokemon: [],
    pokemonTypes: [],
    pokemonGeneration: [],
    selectedType: "All",
    selectedGeneration: "All",
    booksMarks: [],
    pokemonDetailsObj: {}
};

const PokemonSlice = createSlice({
    name: "pokeDex",
    initialState,
    reducers: {
        setPokemon: (state, actions) => {
            state.pokemon = actions.payload || [];
        },
        setSearchByNamePokemon: (state, actions) => {
            state.searchByNamePokemon = actions.payload || [];
        },
        setPokemonTypes: (state, actions) => {
            state.pokemonTypes = actions.payload || [];
        },
        setSelectedType: (state, actions) => {
            state.selectedType = actions.payload;
        },
        setPokemonGeneration: (state, actions) => {
            state.pokemonGeneration = actions.payload || []
        },
        setSelectedGeneration: (state, actions) => {
            state.selectedGeneration = actions.payload
        },
        setBookMarks: (state, actions) => {
            state.booksMarks = actions.payload || []
        },
        setPokemonDetailsObj: (state, actions) => {
            state.pokemonDetailsObj = actions.payload;
        }
    },
});

export const {
    setPokemon,
    setSearchByNamePokemon,
    setPokemonTypes,
    setSelectedType,
    setPokemonGeneration,
    setSelectedGeneration,
    setBookMarks,
    setPokemonDetailsObj
} = PokemonSlice.actions;
export default PokemonSlice.reducer;
