import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pokemon: [],
    searchByNamePokemon: [],
    pokemonTypes: [],
    pokemonGeneration: [],
    selectedType: "All",
    selectedGeneration: "All",
    bookMarks: [],
    pokemonDetailsObj: null,
    isUserLogin: false,
};

const PokemonSlice = createSlice({
    name: "pokeDex",
    initialState,
    reducers: {
        setPokemon: (state, actions) => {
            state.pokemon = actions.payload;
        },
        setSearchByNamePokemon: (state, actions) => {
            state.searchByNamePokemon = actions.payload;
        },
        setPokemonTypes: (state, actions) => {
            state.pokemonTypes = actions.payload;
        },
        setSelectedType: (state, actions) => {
            state.selectedType = actions.payload;
        },
        setPokemonGeneration: (state, actions) => {
            state.pokemonGeneration = actions.payload;
        },
        setSelectedGeneration: (state, actions) => {
            state.selectedGeneration = actions.payload;
        },

        setPokemonDetailsObj: (state, actions) => {
            state.pokemonDetailsObj = actions.payload;
        },
        setBookMarks: (state, actions) => {
            state.bookMarks = actions.payload || [];
        },
        setIsUserLogin: (state, actions) => {
            state.isUserLogin = actions.payload
        },
    },
});

export const {
    setPokemon,
    setSearchByNamePokemon,
    setPokemonTypes,
    setSelectedType,
    setPokemonGeneration,
    setSelectedGeneration,
    setPokemonDetailsObj,
    setBookMarks,
    setIsUserLogin,
} = PokemonSlice.actions;
export default PokemonSlice.reducer;
