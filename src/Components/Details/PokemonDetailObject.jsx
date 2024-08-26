import React, { useState } from "react";
import About from "./About";
import BaseStats from "./BaseStats";
import Evolution from "./Evolution";
import Moves from "./Move";

export default function PokemonDetailObject({ pokemonDetailsObj }) {
    console.log("PokemonDetailObject => pokemonDetailsObj", pokemonDetailsObj);
    const { height, weight, abilities, stats, id, moves } = pokemonDetailsObj;

    const [pokedexObject] = useState(["ABOUT", "BASE STATS", "EVOLUTION", "MOVES"]);
    const [activeTab, setActiveTab] = useState("ABOUT");

    function handleSetTab(tab) {
        setActiveTab(tab);
    }

    return (
        <>
            <div className="w-full h-auto">
                <div className="w-full border-b border-slate-300">
                    <div className="flex justify-between items-center mt-14 px-5 mb-4">
                        {pokedexObject.map((tab, i) => (
                            <button
                                key={i}
                                onClick={() => handleSetTab(tab)}
                                className={`
                                    px-4 py-2 cursor-pointer font-medium text-sm 
                                    transition-all duration-300 ease-in-out rounded-md
                                    active:bg-blue-100 active:scale-95 outline-none
                                    ${activeTab === tab
                                        ? "border-b-2 border-blue-500 text-blue-600"
                                        : "text-gray-600 hover:border-b-2 hover:border-blue-300"
                                    }
                                `}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>
                </div>

                {activeTab === "ABOUT" && <About height={height} weight={weight} abilities={abilities} />}
                {activeTab === "BASE STATS" && <BaseStats stats={stats} />}
                {activeTab === "EVOLUTION" && <Evolution EvoId={id} />}
                {activeTab === "MOVEs" && <Moves moves={moves} />}
            </div>
        </>
    );
}