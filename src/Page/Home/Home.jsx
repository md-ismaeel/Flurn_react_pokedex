import { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import PokemonCard from '../../Components/PokemonCard/PokemonCard';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setPokemon } from '../../Redux/Slice/PokemonSlice';
import HeroSection from '../HeroSection/HeroSection';
import Loading from '../../Components/Loading/Loading';

// Debounce function
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

export default function Home() {
    const { pokemon } = useSelector((state) => state.PokemonSlice);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const fetchPokemon = async () => {
        if (loading) return;
        setLoading(true);
        try {
            const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`;
            const response = await axios.get(url);
            const results = response.data.results;

            const responsePokemonUrl = await Promise.all(
                results.map(async (item) => {
                    const response = await axios.get(item.url);
                    return response.data;
                })
            );

            const prevData = [...pokemon, ...responsePokemonUrl];
            dispatch(setPokemon(prevData));
            setOffset(prevOffset => prevOffset + 10);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const debouncedFetchPokemon = useCallback(
        debounce(() => {
            if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100) {
                fetchPokemon();
            }
        }, 200),
        [fetchPokemon]
    );

    useEffect(() => {
        fetchPokemon();
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', debouncedFetchPokemon);
        return () => window.removeEventListener('scroll', debouncedFetchPokemon);
    }, [debouncedFetchPokemon]);

    if (!pokemon.length) {
        return (
            <h1 className='w-full h-screen flex justify-center items-center text-center text-2xl text-teal-600'>
                No Pokémon data found!!
            </h1>
        );
    }

    return (
        <>
            <HeroSection />
            <section className='w-full h-auto flex flex-col justify-center items-center'>
                <ul className='w-full h-auto flex flex-wrap justify-center items-center gap-5'>
                    {pokemon.map((item) => (
                        <NavLink to={`details/${item.id}`} key={item.id}>
                            <PokemonCard item={item} />
                        </NavLink>
                    ))}
                </ul>
                {loading && <Loading color="#00BFFF" loading={true} />}
            </section>
        </>
    );
}
