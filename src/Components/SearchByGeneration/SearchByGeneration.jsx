import axios from "axios";
import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPokemonGeneration, setSelectedGeneration } from "../../Redux/Slice/PokemonSlice";

export default function SearchByGeneration() {
    const { pokemonGeneration, selectedGeneration } = useSelector((state) => state.PokemonSlice);
    const dispatch = useDispatch();


    function handleChange(e) {
        const newGen = e.target.value;
        if (newGen !== selectedGeneration) {
            dispatch(setSelectedGeneration(newGen));
        }
    }

    const fetchGenerations = async () => {
        try {
            const url = `https://pokeapi.co/api/v2/generation`;
            const response = await axios.get(url);
            const results = response.data.results;
            dispatch(setPokemonGeneration(results));
        } catch (err) {
            console.warn("ThugBoss_Error" + err.message);
        }
    };

    useEffect(() => {
        fetchGenerations();

    }, []);

    return (
        <>
            <div className="flex items-center space-x-4">
                <select onChange={handleChange} value={selectedGeneration} className="w-42 h-12 border text-lg font-normal border-gray-300 rounded-md px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer">
                    <option value="All">All Generation</option>
                    {pokemonGeneration &&
                        pokemonGeneration.map((gen) => (
                            <option key={gen.name} value={gen.name} className="capitalize">
                                {gen.name}
                            </option>
                        ))}
                </select>
            </div>
        </>
    );
}
