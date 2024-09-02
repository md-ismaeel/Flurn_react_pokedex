import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Components/Loading/Loading";
import SearchBYTypes from "../../Components/SearchByTypes/SearchByType";
import SearchByGeneration from "../../Components/SearchByGeneration/SearchByGeneration";
import logo from "../../../public/pokemon-23.svg";
import { useDispatch, useSelector } from "react-redux";
import "./Hero.css";
import Logout from "../../Components/Logout/Logout";

export default function HeroSection() {
    const { isUserLogin } = useSelector((state) => state.PokemonSlice);
    const [isLoading, setIsLoading] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRefresh = () => {
        setIsRotating(true);
        setIsLoading(true)
        setTimeout(() => {
            setIsRotating(false);
            window.location.reload();  // Consider reloading data instead of the entire page if possible
        }, 2000);
    };


    return (
        <>
            {isLoading && <Loading color="#00BFFF" loading={true} />}
            <section className="hero-container relative w-full min-h-[180px] flex flex-col justify-center items-center gap-5 border mb-4 bg-slate-100">
                <div className="">
                    {/* Pokédex */}
                    <img
                        src={logo}
                        className="hero-logo w-[100%] h-[60px] flex justify-center items-center cursor-pointer"
                    />
                </div>
                <div className="all-icons w-full flex justify-center items-center gap-4">
                    <div className="flex gap-3">
                        <IoSearchOutline
                            onClick={() => navigate("/search")}
                            className="cursor-pointer text-green-700 text-4xl font-bold"
                            aria-label="Search"
                        />
                        <FaBookmark
                            onClick={() => navigate("/bookmarks")}
                            className="cursor-pointer text-green-700 text-4xl font-bold"
                            aria-label="Bookmarks"
                        />
                    </div>
                    <SearchBYTypes />
                    <SearchByGeneration />
                    <button
                        onClick={handleRefresh}
                        className="refresh-btn w-[120px] h-[45px] flex justify-center items-center bg-green-700 hover:bg-green-800 active:bg-green-900 text-white text-xl rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transform hover:scale-105 active:scale-100"
                        aria-label="Refresh page"
                    >
                        <IoMdRefresh
                            className={`text-2xl font-bold mr-2 transition-transform duration-500 ${isRotating ? "animate-spin" : ""
                                }`}
                        />
                        <span className="text-xl font-medium">Reset</span>
                    </button>
                </div>
                <Logout />
            </section>
        </>
    );
}
