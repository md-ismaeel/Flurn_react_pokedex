import React from 'react'
import { useParams } from 'react-router-dom'

export default function PokemonDetails() {

    const { id } = useParams();
    console.log(id);


    return (
        <>
            <section className=''>

            </section>
        </>
    )

}
