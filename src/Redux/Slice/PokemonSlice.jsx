import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLogin: false,
    pokemon: [],
    searchByNamePokemon: [],
    pokemonTypes: [],
    pokemonGeneration: [],
    selectedType: "All",
    selectedGeneration: "All",
    bookMarks: [],
    pokemonDetailsObj: null,
};

const PokemonSlice = createSlice({
    name: "pokeDex",
    initialState,
    reducers: {
        setIsLogin: (state, actions) => {
            state.isLogin = actions.payload
        },
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
    },
});

export const {
    setIsLogin,
    setPokemon,
    setSearchByNamePokemon,
    setPokemonTypes,
    setSelectedType,
    setPokemonGeneration,
    setSelectedGeneration,
    setPokemonDetailsObj,
    setBookMarks,
} = PokemonSlice.actions;
export default PokemonSlice.reducer;
