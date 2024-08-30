import React, { useEffect, useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Loading } from "../../Components/Loading/Loading";
import SearchBYTypes from "../../Components/SearchByTypes/SearchByType";
import SearchByGeneration from "../../Components/SearchByGeneration/SearchByGeneration";
import logo from "../../../public/pokemon-23.svg";
import { useDispatch } from "react-redux";
import { toast } from "material-react-toastify";
import axios from "axios";
import { BACKEND_END_POINT, requestOptions } from "../../Utils/utils";
import { setIsLogin } from "../../Redux/Slice/PokemonSlice";
import { PulseLoader } from "react-spinners";

export default function HeroSection() {
    const [loading, setLoading] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRefresh = () => {
        setIsRotating(true);
        setLoading(true);
        setTimeout(() => {
            setIsRotating(false);
            window.location.reload();
        }, 2000);
    };

    async function handleLogout() {
        setIsLoading(true);
        try {
            const response = await axios.get(
                `${BACKEND_END_POINT}/logout`,
                requestOptions
            );
            // console.log("response", response);

            if (response?.data?.success) {
                dispatch(setIsLogin(false));
                toast.success(response?.data?.message);
                // localStorage.clear()
            }
        } catch (err) {
            console.warn("ERROR =>" + err);
            toast.error(err?.response?.data?.message);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <>
            {loading && <Loading color="#00BFFF" loading={true} />}
            <section className="relative w-full h-[180px] flex flex-col justify-center items-center gap-5 border mb-4 bg-slate-100">
                <div className="">
                    {/* Pokédex */}
                    <img
                        src={logo}
                        className="w-[100%] h-[60px] flex justify-center items-center cursor-pointer"
                    />
                </div>
                <div className="w-full flex justify-center items-center gap-4">
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
                    <SearchBYTypes />
                    <SearchByGeneration />
                    <button
                        onClick={handleRefresh}
                        className="w-[115px] h-[45px] flex justify-center items-center bg-green-700 hover:bg-green-800 active:bg-green-900 text-white text-xl rounded-md shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-green-500 focus:ring-opacity-50 transform hover:scale-105 active:scale-100"
                        aria-label="Refresh page"
                    >
                        <IoMdRefresh
                            className={`text-3xl font-bold mr-1 transition-transform duration-500 ${isRotating ? "animate-spin" : ""
                                }`}
                        />
                        <span className="text-2xl font-medium">Reset</span>
                    </button>
                </div>

                <button
                    onClick={handleLogout}
                    className={`absolute top-4 right-4 h-[45px] flex justify-center items-center max-w-sm py-2 px-4 text-white text-md font-medium bg-green-700 rounded-md shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-opacity-50 mt-1 hover:scale-105
                         ${isLoading ? "opacity-75 cursor-not-allowed" : "hover:bg-green-800 active:bg-green-900"}`}
                    disabled={loading}
                >

                    {isLoading ? (
                        <span className="absolute top-4 right-[90px] flex items-center justify-center">
                            <PulseLoader size={8} color={"#ffffff"} />
                        </span>
                    ) : (<span className="text-[17px] font-medium">Logout</span>)}
                </button>
            </section>
        </>
    );
}
