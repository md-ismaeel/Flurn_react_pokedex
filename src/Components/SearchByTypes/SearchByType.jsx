import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setPokemonTypes, setSelectedType } from '../../Redux/Slice/PokemonSlice';

export default function SearchByTypes() {
    const { pokemonTypes, selectedType } = useSelector((state) => state.PokemonSlice);
    const dispatch = useDispatch();

    const handleTypeChange = (e) => {
        const newType = e.target.value;
        if (newType !== selectedType) {
            dispatch(setSelectedType(newType));
        }
    };

    useEffect(() => {
        const fetchByType = async () => {
            try {
                const url = `https://pokeapi.co/api/v2/type`;
                const response = await axios.get(url);
                const results = response.data.results;
                dispatch(setPokemonTypes(results));
            } catch (err) {
                console.warn("ThugBoss_Error: " + err.message);
            }
        };

        fetchByType();
    }, []);

    return (
        <>
            <div className="w-[180px] flex items-center space-x-4">
                <select
                    value={selectedType}
                    onChange={handleTypeChange}
                    className="w-full h-12 border text-lg font-normal border-gray-300 rounded-md px-3 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer"
                >
                    <option value="All">All Types</option>
                    {pokemonTypes && pokemonTypes.map((option) => (
                        <option key={option.name} value={option.name}>
                            {option.name.charAt(0).toUpperCase() + option.name.slice(1)}
                        </option>
                    ))}
                </select>
            </div>
        </>
    );
}
