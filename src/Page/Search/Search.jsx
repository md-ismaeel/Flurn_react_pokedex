import React, { useRef, useState, useEffect } from "react";
import PokemonCard from "../../Components/PokemonCard/PokemonCard";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { Loading } from "../../Components/Loading/Loading";
import { setSearchByNamePokemon } from "../../Redux/Slice/PokemonSlice";
import { IoIosClose } from "react-icons/io";

export default function Search() {
    const { searchByNamePokemon } = useSelector((state) => state.PokemonSlice);
    const dispatch = useDispatch();
    const queryRef = useRef(null);
    const [query, setQuery] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (query === "") return;

        const searchByName = async () => {
            setLoading(true);
            setError(null); // Reset error state
            try {
                const url = `https://pokeapi.co/api/v2/pokemon/${query}`;
                const response = await axios.get(url);
                dispatch(setSearchByNamePokemon([response.data])); // Wrap in array
                console.log([response.data]);
            } catch (err) {
                console.error("Error while fetching API by name: " + err.message);
                setError("Pokémon not found or there was an issue with the request!");
                dispatch(setSearchByNamePokemon([]));
            } finally {
                setLoading(false);
            }
        };

        searchByName();

        return () => dispatch(setSearchByNamePokemon([]));
    }, [query, dispatch]);

    function handleSubmit(e) {
        e.preventDefault();
        const pokemonName = queryRef.current.value.trim().toLowerCase();
        if (pokemonName !== "") {
            setQuery(pokemonName);
        }
    }

    const handleCancel = () => {
        setQuery("");
        if (queryRef.current) {
            queryRef.current.value = "";
        }
        dispatch(setSearchByNamePokemon([])); // Reset search results
    };

    return (
        <section className="w-full h-auto flex flex-col justify-center items-center">
            <span className="w-1/2 mt-10 flex justify-start items-center gap-2">
                <FaArrowLeftLong
                    onClick={() => navigate("/")}
                    className="text-yellow-500 hover:text-yellow-600 text-4xl cursor-pointer font-semibold"
                />
                <span className="text-2xl font-semibold">Back</span>
            </span>
            <form
                onSubmit={handleSubmit}
                className="w-full h-auto flex justify-center items-center gap-2 mt-2 py-5"
            >
                <div className="relative">
                    <input
                        type="text"
                        ref={queryRef}
                        placeholder="Search By Name and ID..."
                        className="w-[500px] h-12 px-4 border border-gray-300 rounded-lg outline-none focus:ring-4 focus:ring-amber-200 focus:border-transparent transition-all duration-200 text-base placeholder-gray-400"
                    />
                    {query && (
                        <span
                            onClick={handleCancel}
                            className="absolute top-2 right-2 text-teal-700 text-3xl cursor-pointer"
                        >
                            <IoIosClose />
                        </span>
                    )}
                </div>
                <button
                    type="submit"
                    className="h-12 px-6 py-2 bg-gradient-to-br from-amber-500 to-amber-700 hover:from-amber-600 hover:to-amber-800 active:from-amber-700 active:to-amber-900 rounded-lg text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-opacity-50 text-base tracking-wider"
                >
                    Search
                </button>
            </form>
            <ul className="w-full h-auto flex flex-wrap justify-center items-center gap-5">
                {Array.isArray(searchByNamePokemon) && searchByNamePokemon.length > 0 ? (
                    searchByNamePokemon.map((item) => (
                        <NavLink to={`details/${item.id}`} key={item.id}>
                            <PokemonCard item={item} />
                        </NavLink>
                    ))
                ) : (
                    <h1 className="w-full h-auto flex justify-center items-center text-center text-2xl text-teal-600 mt-20">
                        Pokémon search results are empty!
                    </h1>
                )}
            </ul>
            {loading && <Loading color="#00BFFF" loading={true} />}
            {error && <p className="text-xl text-red-500 text-center mb-10 mt-4">{error}</p>}
        </section>
    );
}
