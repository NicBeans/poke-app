import { useRouter } from 'next/router';

export default function Pokemon({ pokemon }) {
  const router = useRouter();
  if (router.isFallback) {
    return 'The fallback page says: Loading...';
  }

  return (
    <>
      <h1>{pokemon.name}</h1>
      <img
        src={pokemon.sprites.other.dream_world.front_default}
        alt={pokemon.name}
      />
    </>
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