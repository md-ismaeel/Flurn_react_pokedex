import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from 'react-redux';
import PokemonCard from '../../Components/PokemonCard/PokemonCard';

export default function Bookmarks() {
    const { bookMarks } = useSelector((state) => state.PokemonSlice)
    // console.log("BookmarksPage=>", bookMarks);

    const navigate = useNavigate()
    return (
        <>
            <section className='w-full h-auto flex flex-col justify-center items-center '>
                <span className="w-1/2 mt-10 mb-10 flex justify-start items-center gap-2"><FaArrowLeftLong onClick={() => navigate("/")} className=" text-yellow-500 hover:text-yellow-600 text-4xl cursor-pointer font-semibold" /><span className="text-2xl font-semibold">Back</span></span>

                <ul className='w-full h-auto flex flex-wrap justify-center items-center gap-4 mb-10'>
                    {bookMarks && bookMarks.length > 0 ? (
                        bookMarks.map((item) => (
                            <NavLink to={`details/${item.id}`} key={item.id}>
                                <PokemonCard item={item} />
                            </NavLink>
                        ))
                    ) : (
                        <h1 className='w-full h-auto flex justify-center items-center text-center text-2xl text-teal-600 mt-20'>
                            Pokémon Listed data doesn't Exits!!
                        </h1>
                    )}
                </ul>
            </section>
        </>
    )
}

