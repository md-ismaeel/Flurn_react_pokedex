import React from 'react'
import axios from "axios"


export const Home = () => {

    const url = `https://pokeapi.co/api/v2/pokemon`

    React.useEffect(() => {

        const apiCall = async () => {
            try {
                const response = await axios.get(url)
                console.log(response);

            } catch (err) {
                console.log(err);

            }
        }

        apiCall()

    }, [])

    return (
        <>
            <section className='w-full h-auto flex flex-col justify-center items-center'>

            </section>
        </>
    )
}


