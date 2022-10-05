import Head from 'next/head';
import styled from 'styled-components';
import { useState, useEffect } from 'react';


export default function Home({fetchedPoke}) {
  console.log(fetchedPoke)
  const [pokemon, setPokemon] = useState(fetchedPoke)

  return (
    
    <div className="container">
      <Head>
        <title>Pokemon App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Pokemon App</h1>
        {pokemon.results.map((pokes,i) => (
           
            <div key={i}>
              {pokes.name}
            </div>
          
        ))}
    </div>
    </div>
  )
}

export async function getStaticProps() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=905')
  const fetchedPoke = await response.json()
  return {
    props:
    {
      fetchedPoke
    }
  }
}