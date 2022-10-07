import { useRouter } from 'next/router';
import { Title } from '../../components/titlestyle';
import { Wrapper } from '../../components/backgroundstyle';
import { PokeList } from '../../components/pokeliststyle';
import { Image } from '../../components/pokeimage';
import { CenterDiv } from '../../components/centercontainer';

export default function Pokemon({ pokemon }) {
  const router = useRouter();
  if (router.isFallback) {
    return 'The fallback page says: Loading...';
  }

  

  return (
    <Wrapper>
      <Title>{pokemon.name}</Title>
      <Image
        src={pokemon.sprites.front_default}
        alt={pokemon.name}
      />
        <Image
        src={pokemon.sprites.back_default}
        alt={pokemon.name}
      />
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
