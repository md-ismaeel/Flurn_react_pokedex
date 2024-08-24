import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setPokemonDetailsObj } from "../../Redux/Slice/PokemonSlice";
import Loading from "../../Components/Loading/Loading";
import { useGetBackgroundClass, useGetBackgroundGradientsClass } from "../../Hooks/backgroundClass";
import { FaArrowLeftLong } from "react-icons/fa6";
import { CiBookmark } from "react-icons/ci";
import { FaBookmark } from "react-icons/fa";

export default function PokemonDetails() {
    const { pokemonDetailsObj } = useSelector((state) => state.PokemonSlice);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const { id } = useParams();

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

    if (loading) return <Loading color="#00BFFF" loading={true} />;
    if (error) return <p className="text-red-500">{error}</p>;
    if (!pokemonDetailsObj) return null;

    return (
        <section className="w-full h-auto flex flex-col justify-center items-center">
            <li
                className={`relative w-[500px] h-[350px] p-4 text-white rounded-t-xl border shadow-md overflow-hidden transition-all duration-300 ease-in-out ${useGetBackgroundGradientsClass(
                    pokemonDetailsObj?.types
                )} hover:shadow-xl mt-10 list-none`}
            >
                <div className="absolute flex justify-center items-center gap-2 top-4 right-5 text-3xl">
                    <span>{`#${pokemonDetailsObj?.id}`}</span>
                    <span className="text-4xl cursor-pointer">
                        <CiBookmark />
                    </span>
                </div>
                <div className="absolute flex justify-center items-center gap-4 top-5 left-4 text-4xl font-semibold">
                    <span className="flex justify-start items-center gap-2">
                        <FaArrowLeftLong
                            onClick={() => navigate("/")}
                            className=" text-yellow-500 hover:text-yellow-600 text-4xl cursor-pointer font-semibold"
                        />
                    </span>
                    <span>
                        {pokemonDetailsObj?.name?.charAt(0).toUpperCase() +
                            pokemonDetailsObj?.name?.slice(1)}
                    </span>
                </div>

                <div className="absolute left-3 top-20">
                    {pokemonDetailsObj?.types?.map((type, i) => (
                        <div
                            key={i}
                            className="w-full flex justify-center items-center gap-2"
                        >
                            <p
                                className={`${useGetBackgroundClass([type,])} 
                                w-[100px] h-[40px] text-md flex justify-center items-center rounded-full mb-1`}
                            >
                                {type.type?.name[0].toUpperCase() + type?.type?.name.slice(1)}
                            </p>
                        </div>
                    ))}
                </div>

                <div className="absolute w-[80%] h-[80%] flex justify-center items-center right-1 top-14">
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
            <div className="absolute bottom-12 w-[500px] min-h-[200px] bg-slate-200 rounded-3xl">

            </div>
        </section>
    );
}
