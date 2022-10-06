import Head from 'next/head';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SearchArray from 'search-array';

export default function Home({fetchedPoke}) {
  console.log(typeof(fetchedPoke))
  
  const [pokemon, setPokemon] = useState(fetchedPoke);
  const [value, setValue] = useState('bulbasaur');
  const [search, setSearch] = useState(pokemon);

  console.log(typeof(value))
  console.log(typeof(search))
  
  return (  
    <div className="container">
      <Head>
        <title>Pokemon App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <h1>Pokemon App</h1>


        {search.results.map((pokes,i) => (
           <p>
            {i+1} {pokes.name}
           </p>
           // for list without numbers
            // <div key={i}>
            //   {pokes.name}
            // </div> 

          
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