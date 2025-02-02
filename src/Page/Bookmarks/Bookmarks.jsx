import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useSelector } from "react-redux";
import PokemonCard from "../../Components/PokemonCard/PokemonCard";

export default function Bookmarks() {
  const { bookMarks } = useSelector((state) => state?.pokeDex);
  const navigate = useNavigate();

  return (
    <>
      <section className="w-full h-auto flex flex-col justify-center items-start px-5">
        {bookMarks.length > 0 && (
          <span className="back-bookmark mt-10 mb-10 flex space-x-4">
            <FaArrowLeftLong
              onClick={() => navigate("/")}
              className=" text-yellow-500 hover:text-yellow-600 text-4xl cursor-pointer font-semibold"
            />
            <span className="text-2xl font-semibold mt-1">Bookmarks Pokédex</span>
          </span>
        )}

        <ul className="w-full h-auto flex flex-wrap justify-start items-center gap-4 mb-10">
          {bookMarks && bookMarks.length > 0 ? (
            bookMarks.map((item) => (
              <NavLink to={`details/${item.id}`} key={item.id}>
                <PokemonCard item={item} />
              </NavLink>
            ))
          ) : (
            <div className="w-full min-h-screen flex flex-col justify-center items-center">
              <h1 className="w-full h-auto flex justify-center items-center text-center text-2xl text-teal-600 mt-20">
                Pokémon Listed data doesn't Exits!!
              </h1>
              <button
                className="mt-3 bg-green-700 hover:bg-green-800 active:bg-green-900 text-white font-semibold px-4 py-2 rounded-md transition-transform duration-200"
                onClick={() => navigate("/")}
              >
                Back to Home
              </button>
            </div>
          )}
        </ul>
      </section>
    </>
  );
}
