import { useEffect, useState, useCallback, useRef } from 'react';
import axios from 'axios';
import PokemonCard from '../../Components/PokemonCard/PokemonCard';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemon } from '../../Redux/Slice/PokemonSlice';
import HeroSection from '../HeroSection/HeroSection';
import {Loading} from '../../Components/Loading/Loading';

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export default function Home() {
    const { pokemon, selectedType = "All", selectedGeneration = "All" } = useSelector((state) => state.PokemonSlice);
    const [offset, setOffset] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const scrollPositionRef = useRef(0);
    const dispatch = useDispatch();


    const fetchPokemonSelectedByTypeAndGeneration = async (isInitialFetch = false) => {
        if (loading) return;
        setLoading(true);
        scrollPositionRef.current = window.scrollY;
        try {
            let newPokemon = [];
            if (selectedType !== "All") {
                const url = `https://pokeapi.co/api/v2/type/${selectedType ? selectedType : ""}`;
                const response = await axios.get(url);
                const results = response.data.pokemon;

                const startIndex = isInitialFetch ? 0 : offset;
                const pokemonOfType = await Promise.all(
                    results.slice(startIndex, startIndex + 10).map(async (p) => {
                        const res = await axios.get(p.pokemon.url);
                        return res.data;
                    })
                );

                newPokemon = pokemonOfType;
                setOffset((prevOffset) => prevOffset + 10);

            } else if (selectedGeneration !== "All") {
                const url = `https://pokeapi.co/api/v2/generation/${selectedGeneration ? selectedGeneration : ""}`;
                const response = await axios.get(url);
                const pokemonSpecies = response.data.pokemon_species;

                const startIndex = isInitialFetch ? 0 : offset;
                const pokemonOfGeneration = await Promise.all(
                    pokemonSpecies.slice(startIndex, startIndex + 10).map(async (species) => {
                        const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${species.name}`);
                        return pokemonResponse.data;
                    })
                );

                newPokemon = pokemonOfGeneration;
                setOffset((prevOffset) => prevOffset + 10);

            } else {
                const url = `https://pokeapi.co/api/v2/pokemon?offset=${isInitialFetch ? 0 : offset}&limit=10`;
                const response = await axios.get(url);
                const results = response.data.results;

                newPokemon = await Promise.all(
                    results.map(async (item) => {
                        const response = await axios.get(item.url);
                        return response.data;
                    })
                );

                setOffset((prevOffset) => prevOffset + 10);
            }

            if (isInitialFetch) {
                dispatch(setPokemon(newPokemon));
            } else {
                dispatch(setPokemon([...pokemon, ...newPokemon]));
            }
        } catch (err) {
            console.warn("ThugBoss-Error: " + err.message);
            setError(`Pokémon not found!! ${err?.message}`);
        } finally {
            setLoading(false);
            setTimeout(() => {
                window.scrollTo({
                    top: scrollPositionRef.current,
                    behavior: 'auto'
                });
            }, 300);
        }
    };

    useEffect(() => {
        // Reset everything when filters change
        dispatch(setPokemon([]));
        setOffset(0);
        setError(null);

        // Fetch initial data with new filters
        fetchPokemonSelectedByTypeAndGeneration(true);
        return () => dispatch(setPokemon([]))
    }, [dispatch, selectedType, selectedGeneration]);

    const handleScroll = useCallback(
        debounce(() => {
            if (loading) return;
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = document.documentElement.scrollTop;
            const clientHeight = document.documentElement.clientHeight;
            if (clientHeight + scrollTop + 1 >= scrollHeight) {
                fetchPokemonSelectedByTypeAndGeneration(false);
            }
        }, 300),
        [loading, selectedType, selectedGeneration]
    );

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    // if (loading) return <Loading color="#00BFFF" loading={true} />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <>
            <HeroSection />
            <section className='w-full h-auto flex flex-col justify-center items-center'>
                <ul className='w-full h-auto flex flex-wrap justify-center items-center gap-4 mb-10'>
                    {Array.isArray(pokemon) && pokemon.length > 0 ? (
                        pokemon.map((item) => (
                            <NavLink to={`details/${item.id}`} key={item.id}>
                                <PokemonCard item={item} />
                            </NavLink>
                        ))
                    ) : (
                        <h1 className='w-full h-auto flex justify-center items-center text-center text-2xl text-teal-600 mt-20'>
                            No Pokémon data found!!
                        </h1>
                    )}
                </ul>
                {loading && <Loading color="#00BFFF" loading={true} />}
            </section>
        </>
    );
}