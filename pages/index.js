import Head from 'next/head';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import SearchArray from 'search-array';
import Link from 'next/link';
import axios from 'axios';
import { Title, MainTitle } from '../components/titlestyle';
import { Wrapper, HeaderWrapper } from '../components/backgroundstyle';
import { PokeList } from '../components/pokeliststyle';
import { ListImage } from '../components/pokeimage';
import { StyledButton } from '../components/buttonstyle';
import { CenterDivRow, CenterDivCol, MainTitleSection, CenterDivColButton, CenterDivRowButton } from '../components/centercontainer';



export default function Home({fetchedPoke}) {
  const [pokemon, setPokemon] = useState(fetchedPoke);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState('');

  console.log(pokemon.next)

  const handleClickNext = async() =>  {
      setIsLoading(true);
  
      try {
        const response = await fetch(pokemon.next);
  
        if (!response.ok) {
          throw new Error(`Error! status: ${response.status}`);
        }
  
        const result = await response.json();
  
        setPokemon(result);

    } catch (err) {
      setErr(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClickPrevious = async() =>  {
    setIsLoading(true);

    try {
      const response = await fetch(pokemon.previous);

      if (!response.ok) {
        throw new Error(`Error! status: ${response.status}`);
      }

      const result = await response.json();

      setPokemon(result);

  } catch (err) {
    setErr(err.message);
  } finally {
    setIsLoading(false);
  }
};

  

  return (  
    <Wrapper>
      <Head>
        <title>Pokemon App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div>
        <MainTitle>Pokemon App</MainTitle>
        {pokemon.results.map((pokes,i) => (
           <PokeList key={pokes.name}>
            <Link href={`/pokemon/${pokes.name}`}>
              <a>
            {i+1} {pokes.name}
            </a> 
            </Link>
           </PokeList>
           
        ))}
        <CenterDivRowButton>
        <CenterDivColButton>
        <StyledButton onClick={handleClickPrevious}>previous</StyledButton>
        </CenterDivColButton>
        <CenterDivColButton>
        <StyledButton onClick={handleClickNext}>next</StyledButton>
        </CenterDivColButton>
        </CenterDivRowButton>
      </div>
    </Wrapper>
  )
}


export async function getStaticProps() {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  let fetchPageNum = 0;
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=20&offset=0/`
  );
  if (response.status === 404) {
    return {
      notFound: true,
    };
  }

  const fetchedPoke = await response.json();
  return {
    props: {
      fetchedPoke,
    },
  };
}