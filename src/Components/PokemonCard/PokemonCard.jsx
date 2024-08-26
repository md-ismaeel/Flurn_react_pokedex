import React from 'react'
import { useGetBackgroundClass, useGetBackgroundGradientsClass } from "../../Hooks/backgroundClass";

export default function PokemonCard({ item }) {
    // console.log("pokemonCard Item", item);
    if (!item) {
        return <div className='w-full text-center'>Item is Undefined</div>
    }

    return (
        <li className={`relative w-[290px] h-60 p-4 text-white rounded-xl border shadow-md overflow-hidden transition-all duration-300 ease-in-out ${useGetBackgroundGradientsClass(item.types)} hover:shadow-xl hover:scale-105 list-none`}>
            <p className='absolute top-2 right-2 text-2xl'>{`#${item.id}`}</p>
            <h1 className='absolute top-5 left-4 text-3xl capitalize'>{item?.name}</h1>

            <div className='absolute left-3 top-16'>
                {item.types?.map((type, i) => (
                    <div key={i} className='w-full flex justify-center items-center gap-2'>
                        <p className={`${useGetBackgroundClass([type])} w-[80px] h-[40px] text-sm flex justify-center items-center rounded-full mb-1 capitalize`} >{type.type?.name}</p>
                    </div>)
                )}
            </div>

            <div className='absolute w-[70%] h-[80%] flex justify-center items-center right-1 top-10'>
                <img src={item?.sprites?.other?.home?.front_default || item?.sprites?.other?.dream_world?.front_default} alt={item?.name} className='w-[100%] h-[100%] z-[100] bg-center' />
            </div>

        </li>
    )
}

