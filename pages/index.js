import Footer from "../components/Footer";
import { css } from '@emotion/react';
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";


export default function Home({ pokemons }) {
  console.log(pokemons)
  return (
    <div>
      {pokemons.map((pokemon, index) => {
        return (
          <div style={{ margin: "auto", width: "500px" }} key={index}>
            <a>
              <h3>{pokemon.name}</h3>
            </a>
            <img src={pokemon.image} alt=""/>
          </div>
        );
      })}
    </div>
  );
}

export const getStaticProps = async () => {
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });

  const { data } = await client.query({
    query: gql`
    query pokemons($limit: Int, $offset: Int) {
      pokemons(limit: $limit, offset: $offset) {
        count
        next
        previous
        status
        message
        results {
          url
          name
          image
        }
      }
    }`,
    variables: {
      "limit" :1118,
      "offset" : 0
    }
  });

  return {
    props: { pokemons: data.pokemons.results },
  };
};