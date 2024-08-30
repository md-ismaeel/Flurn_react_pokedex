import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setBookMarks, setPokemonDetailsObj } from "../../Redux/Slice/PokemonSlice";
import {Loading} from "../../Components/Loading/Loading";
import { useGetBackgroundClass, useGetBackgroundGradientsClass } from "../../Hooks/backgroundClass";
import { FaArrowLeftLong } from "react-icons/fa6";
import { GoBookmarkFill } from "react-icons/go";
import PokemonDetailObject from "../../Components/Details/PokemonDetailObject";

export default function PokemonDetails() {
    const { pokemonDetailsObj, bookMarks } = useSelector((state) => state.PokemonSlice);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isBookmarked, setIsBookmarked] = useState(false);

    const navigate = useNavigate();
    const { id } = useParams();

    // Fetch Pokémon data by ID
    const fetchPokemonById = async () => {
        if (loading) return;
        setLoading(true);
        setError(null);
        try {
            const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
            const response = await axios.get(url);
            dispatch(setPokemonDetailsObj(response.data));
        } catch (err) {
            console.warn("ThugBoss-Error: " + err?.message);
            setError("ThugBoss-Error!! " + err?.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPokemonById();
        return () => dispatch(setPokemonDetailsObj({}));
    }, [id, dispatch]);

    useEffect(() => {
        if (pokemonDetailsObj) {
            document.title = pokemonDetailsObj?.name || 'Pokédex';
        }
        return () => document.title = "Pokédex"
    }, [pokemonDetailsObj]);

    const handleToggle = () => {
        if (isBookmarked) {
            const updatedBookmarks = bookMarks.filter((bookmarked) => bookmarked.id !== pokemonDetailsObj.id)
            dispatch(setBookMarks(updatedBookmarks));
        } else {
            dispatch(setBookMarks([...bookMarks, pokemonDetailsObj]));
        }
        setIsBookmarked(!isBookmarked);
    };

    useEffect(() => {
        if (pokemonDetailsObj) {
            const isInBookmarks = bookMarks.some((bookmarked) => bookmarked.id === pokemonDetailsObj.id);
            setIsBookmarked(isInBookmarks);
        }
    }, [pokemonDetailsObj, bookMarks]);

    if (loading) return <Loading color="#00BFFF" loading={true} />;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!pokemonDetailsObj) return null;

    return (
        <section className="w-full h-auto flex flex-col justify-center items-center">
            <li
                className={`relative w-[550px] h-[360px] p-4 text-white rounded-t-xl border shadow-md overflow-hidden transition-all duration-300 ease-in-out ${useGetBackgroundGradientsClass(
                    pokemonDetailsObj?.types
                )} hover:shadow-xl mt-5 list-none`}
            >
                <div className="absolute flex justify-center items-center gap-2 top-4 right-5 text-3xl">
                    <span>{`#${pokemonDetailsObj?.id}` || ""}</span>
                    <span className="text-4xl cursor-pointer" onClick={handleToggle}>
                        {isBookmarked ? <GoBookmarkFill className="text-slate-700" /> : <GoBookmarkFill className="text-white" />}
                    </span>
                </div>
                <div className="absolute flex justify-center items-center gap-4 top-5 left-4 text-4xl font-semibold">
                    <span className="flex justify-start items-center gap-2">
                        <FaArrowLeftLong
                            onClick={() => navigate("/")}
                            className=" text-yellow-500 hover:text-yellow-600 text-4xl cursor-pointer font-semibold"
                        />
                    </span>
                    <span className="capitalize">
                        {pokemonDetailsObj?.name ? pokemonDetailsObj?.name : "Unknown"}
                    </span>
                </div>

                <div className="absolute left-3 top-20">
                    {pokemonDetailsObj?.types?.map((type, i) => (
                        <div
                            key={i}
                            className="w-full flex justify-center items-center gap-2"
                        >
                            <p
                                className={`${useGetBackgroundClass([type])} 
                                w-[100px] h-[40px] text-md flex justify-center items-center rounded-full mb-1 capitalize`}
                            >
                                {type?.type?.name}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="absolute w-[75%] h-[80%] flex justify-center items-center right-1 top-20">
                    <img
                        src={
                            pokemonDetailsObj?.sprites?.other?.home?.front_default ||
                            pokemonDetailsObj?.sprites?.other?.dream_world?.front_default
                        }
                        alt={pokemonDetailsObj?.name}
                        className="w-[100%] h-[100%] z-[100] bg-center"
                    />
                </div>
            </li>
            <div className="w-[550px] min-h-[250px] z-10 bg-white rounded-3xl mt-[-50px] mb-5">
                <PokemonDetailObject pokemonDetailsObj={pokemonDetailsObj} />
            </div>
        </section>
    );
}
