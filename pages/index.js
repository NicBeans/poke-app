import Head from 'next/head';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SearchArray from 'search-array';
import Link from 'next/link';
import axios from 'axios';
import { Title } from '../components/titlestyle';
import { Wrapper } from '../components/backgroundstyle';
import { PokeList } from '../components/pokeliststyle';


export default function Home({fetchedPoke}) {
  //const [pokemon, setPokemon] = useState(fetchedPoke);
  console.log(fetchedPoke);
  let offset = '200';
  
  return (  
    <Wrapper>
      <Head>
        <title>Pokemon App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <Title>Pokemon App</Title>


        {fetchedPoke.results.map((pokes,i) => (
           <PokeList>
            <Link href={`/pokemon/${pokes.name}`}>
              <a>
            {i+1} {pokes.name}
            </a>
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