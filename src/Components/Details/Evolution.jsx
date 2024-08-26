import axios from "axios";
import React, { useEffect, useState } from "react";
import { PiArrowFatDownFill } from "react-icons/pi";

export default function Evolution({ EvoId }) {
    const [evolutionChain, setEvolutionChain] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchEvolutionChain() {
            try {
                const speciesResponse = await axios.get(
                    `https://pokeapi.co/api/v2/pokemon-species/${EvoId}/`
                );
                const evolutionResponse = await axios.get(speciesResponse.data.evolution_chain.url);
                setEvolutionChain(evolutionResponse.data.chain);
            } catch (err) {
                console.warn("ThugBoss-Error: " + err?.message);
                setError(err?.message);
            } finally {
                setLoading(false);
            }
        }

        fetchEvolutionChain();
    }, [EvoId]);


    function renderPokemon(pokemon) {
        const id = pokemon.species.url.split("/").slice(6, 7)

        return (
            <div key={id} className="flex flex-col items-center p-2">
                <img
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${id}.png`}
                    alt={pokemon.species.name}
                    className="w-40 h-40"
                />
                <p className="text-center text-xl font-medium capitalize mt-5">{pokemon.species.name}</p>
                {pokemon.evolves_to.length > 0 && (
                    <div className="p-2 mt-10 mb-5">
                        <PiArrowFatDownFill
                            className="text-5xl text-teal-500 hover:text-teal-500 transition-colors duration-300 cursor-pointer"
                        />
                    </div>
                )}
                {pokemon.evolves_to.map(renderPokemon)}
            </div>
        );
    }

    if (loading) return <div className="text-center text-md italic text-pink-500 mt-5">Loading...</div>;
    if (error)
        return <div className="text-center text-red-500">Error: {error}</div>;

    return (
        <div className="max-w-2xl mx-auto p-4">
            <h2 className="text-2xl font-medium text-center mb-2 text-teal-500">
                Evolution Chain
            </h2>
            {evolutionChain && renderPokemon(evolutionChain)}
        </div>
    );
}
