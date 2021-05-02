import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ApolloClient, InMemoryCache, gql, useQuery } from "@apollo/client";

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
    }`
  });

  console.log('data', data)

  return {
    props: { pokemons: data.pokemons.results },
  };
};

export default function Home({ pokemons }) {
  console.log(pokemons)
  return (
    <div>
      <h2>Hello World</h2>
      {pokemons.map((pokemon, index) => {
        return (
          <div style={{ margin: "auto", width: "500px" }} key={index}>
            <a>
              <h3>{pokemon.name}</h3>
            </a>
          </div>
        );
      })}
    </div>
  );
}
