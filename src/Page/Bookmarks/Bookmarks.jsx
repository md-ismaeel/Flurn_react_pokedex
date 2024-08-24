import React from 'react'
import { useNavigate } from 'react-router-dom'
import { FaArrowLeftLong } from "react-icons/fa6";

export default function Bookmarks() {
    const navigate = useNavigate()
    return (
        <>
            <section className='w-full h-auto flex justify-center items-center'>
                <span className="w-1/2 mt-10 flex justify-start items-center gap-2"><FaArrowLeftLong onClick={() => navigate("/")} className=" text-yellow-500 hover:text-yellow-600 text-4xl cursor-pointer font-semibold" /><span className="text-2xl font-semibold">Back</span></span>
            </section>
        </>
    )
}

