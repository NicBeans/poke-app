import { useRouter } from 'next/router';
import { Title, SubTitle } from '../../components/titlestyle';
import { Wrapper } from '../../components/backgroundstyle';
import { PokeList } from '../../components/pokeliststyle';
import { Image, Image1 } from '../../components/pokeimage';
import { CenterDivRow, CenterDivCol } from '../../components/centercontainer';

export default function Pokemon({ pokemon }) {
  const router = useRouter();
  if (router.isFallback) {
    return 'The fallback page says: Loading...';
  }
console.log(pokemon);
console.log(pokemon.abilities.ability)
  

  return (
    <Wrapper>
      <Title>{pokemon.name}</Title>
        <CenterDivRow>
            <CenterDivCol>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
        </CenterDivCol>
        <CenterDivCol>
        <Image
        src={pokemon.sprites.back_default}
        alt={pokemon.name}
      />
        </CenterDivCol>
        </CenterDivRow>
        <Title>shiny {pokemon.name}</Title>
        <CenterDivRow>
            <CenterDivCol>
      <Image
        src={pokemon.sprites.front_shiny}
        alt={pokemon.name}
      />
        </CenterDivCol>
        <CenterDivCol>
        <Image
        src={pokemon.sprites.back_shiny}
        alt={pokemon.name}
      />
        </CenterDivCol>
        </CenterDivRow>
        <Title>{pokemon.name} abilities</Title>
        
        {pokemon.abilities.map((moves,i) => (
        <PokeList>  
            <a>
            {pokemon.abilities[i].ability.name}
            </a>
        </PokeList>
        ))}

    </Wrapper>
  );
}

export async function getStaticProps(context) {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  const response = await fetch(
    `https://pokeapi.co/api/v2/pokemon/${encodeURIComponent(
      context.params.name
    )}/`
  );
  if (response.status === 404) {
    return {
      notFound: true,
    };
  }

  const pokemon = await response.json();
  return {
    props: {
      pokemon,
    },
  };
}

export async function getStaticPaths() {
  return {
    fallback: true,
    paths: [
      {
        params: {
          name: 'charizard',
        },
      },
      {
        params: {
          name: 'pikachu',
        },
      },
    ],
  };
}
