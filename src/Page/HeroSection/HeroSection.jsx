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
import { toast } from "material-react-toastify";
import axios from "axios";
import { BACKEND_END_POINT, requestOptions } from "../../Utils/utils";
import { setIsLogin } from "../../Redux/Slice/PokemonSlice";
import { PulseLoader } from "react-spinners";
import Cookies from "js-cookie"
import "./Hero.css";

export default function HeroSection() {
    const { isLogin } = useSelector((state) => state.PokemonSlice);
    const [isLoading, setIsLoading] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [logout, setLogout] = useState(false)
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRefresh = () => {
        setIsRotating(true);
        setTimeout(() => {
            setIsRotating(false);
            window.location.reload();  // Consider reloading data instead of the entire page if possible
        }, 2000);
    };

    async function handleLogout() {
        setLogout(true);
        try {
            const response = await axios.get(`${BACKEND_END_POINT}/logout`, requestOptions);
            if (response?.data?.success) {
                dispatch(setIsLogin(false));
                toast.success(response?.data?.message);
                Cookies.remove('token');
                // Optionally clear cookies or localStorage if needed
            }
        } catch (err) {
            console.warn("ERROR =>", err);
            toast.error(err?.response?.data?.message || "An error occurred.");
        } finally {
            setLogout(false);
        }
    }

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            dispatch(setIsLogin(true));
        } else {
            dispatch(setIsLogin(false));
        }
    }, [dispatch]);


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
                <button
                    onClick={handleLogout}
                    className="w-[112px] h-[45px] absolute top-4 right-2 inline-flex items-center justify-start py-3 pl-4 pr-12 overflow-hidden font-semibold transition-all duration-150 ease-in-out cursor-pointer rounded-md hover:pl-10 hover:pr-6 bg-green-700 group"
                >
                    <span className="absolute bottom-0 left-0 w-full h-1 transition-all duration-150 ease-in-out bg-green-800 group-hover:h-full"></span>
                    <span className="absolute right-0 pr-4 duration-200 ease-out group-hover:translate-x-12">
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                        </svg>
                    </span>
                    <span className="absolute left-0 pl-2.5 -translate-x-12 group-hover:translate-x-0 ease-out duration-200">
                        <svg
                            className="w-5 h-5 text-red-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M14 5l7 7m0 0l-7 7m7-7H3"
                            ></path>
                        </svg>
                    </span>
                    <span className="relative w-full h-full text-white text-left transition-colors duration-200 ease-in-out group-hover:text-white">
                        {logout ? (
                            <span className="absolute top-2 right-0 flex items-center justify-center">
                                <PulseLoader size={5} color={"#ffffff"} />
                            </span>
                        ) : (
                            "Logout"
                        )}
                    </span>
                </button>
            </section>
        </>
    );
}
