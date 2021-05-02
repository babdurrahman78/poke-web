import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const getStaticProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await res.json();

  return {
    props: { pokemons: data.results },
  };
};

export default function Home({ pokemons }) {
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
