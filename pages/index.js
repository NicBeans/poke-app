import Head from 'next/head';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SearchArray from 'search-array';
import Link from 'next/link';
import axios from 'axios';
import { Title, MainTitle } from '../components/titlestyle';
import { Wrapper } from '../components/backgroundstyle';
import { PokeList } from '../components/pokeliststyle';
import { ListImage } from '../components/pokeimage';


export default function Home({fetchedPoke}) {
  //const [pokemon, setPokemon] = useState(fetchedPoke);
  
  
  return (  
    <Wrapper>
      <Head>
        <title>Pokemon App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <MainTitle>Pokemon App</MainTitle>


        {fetchedPoke.results.map((pokes,i) => (
           <PokeList>
            <Link href={`/pokemon/${pokes.name}`}>
              <a>
            {i+1} {pokes.name}
            </a>
            {/* <ListImage
              src={pokes.sprites.front_default}
              alt={pokes.name}
            /> */}
            </Link>
           </PokeList>
           // for list without numbers
            // <div key={i}>
            //   {pokes.name}
            // </div> 

          
        ))}

    </div>
    </Wrapper>
  )
}


export async function getStaticProps() {
  const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=905&offset=0');
  const fetchedPoke = await response.json()
  return {
    props:
    {
      fetchedPoke
    }
  }
}