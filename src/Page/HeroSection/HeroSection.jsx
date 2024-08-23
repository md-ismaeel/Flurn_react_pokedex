import React, { useState } from "react";
import { IoMdRefresh } from "react-icons/io";
import { IoSearchOutline } from "react-icons/io5";
import { FaBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loading from "../../Components/Loading/Loading";

export default function HeroSection() {
    const [loading, setLoading] = useState(false);
    const [isRotating, setIsRotating] = useState(false);
    const navigate = useNavigate();

    const handleRefresh = () => {
        setIsRotating(true);
        setTimeout(() => {
            setIsRotating(false);
            window.location.reload();
        }, 500);
    };

    return (
        <>
            {loading && <Loading color="#00BFFF" loading={true} />}
            <section className="w-full h-[170px] flex flex-col justify-center items-center gap-2 border-2 mb-4">
                <div className="text-3xl text-center font-semibold mt-2">Pokédex</div>
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
                    <select className="p-2 border rounded-md">
                        <option>Hello</option>
                    </select>
                    <select className="p-2 border rounded-md">
                        <option>Hello</option>
                    </select>
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
            </section>
        </>
    );
}
