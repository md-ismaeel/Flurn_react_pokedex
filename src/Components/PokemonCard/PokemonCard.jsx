import React from 'react'
import { backgrounds, backgroundGradients } from '../BackGroundTailwindCss/BackGroundTailwindCss'

export default function PokemonCard({ item }) {
    const getBackgroundGradientsClass = (types) => {
        const primaryType = types[0]?.type?.name || types[1]?.type?.name || 'default';
        return backgroundGradients[primaryType];
    }

    const getBackgroundClass = (types) => {
        const primaryType = types[0]?.type?.name || 'default';
        return backgrounds[primaryType] || backgrounds.default;
    }

    return (
        <li className={`relative w-[280px] h-60 p-4 text-white rounded-lg border shadow-md overflow-hidden transition-all duration-300 ease-in-out ${getBackgroundGradientsClass(item.types)} hover:shadow-xl hover:scale-105`}>
            <p className='absolute top-3 right-5 text-2xl'>{`#${item.id}`}</p>
            <h1 className='absolute top-4 left-4 text-3xl'>{item.name.charAt(0).toUpperCase() + item.name.slice(1)}</h1>

            <div className='absolute w-[] left-4 top-14'>
                {item.types?.map((type, i) => (
                    <div key={i} className='w-full flex justify-center items-center gap-2'>
                        <p className={`${getBackgroundClass([type])} w-[85px] h-[40px] flex justify-center items-center rounded-full mb-1`} >{type.type?.name}</p>
                    </div>)
                )}
            </div>

            <div className='absolute w-[65%] h-[70%] flex justify-center items-center right-1 top-14'>
                <img src={item?.sprites?.other?.dream_world?.front_default} alt={item?.name} className='w-[100%] h-[100%] z-[100] bg-center' />
            </div>

        </li>
    )
}

