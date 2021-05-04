import { useContext } from 'react';
import { css } from "@emotion/react";
import { MyPokemonContext } from '../components/PokemonContext';
import { Card, CardTitle, CardImg, Row, Col } from "reactstrap";

const row = css`
  max-width: 1000px;
  margin: auto;
`;

const img = css`
  width: 100px;
  height: 100px;
  margin: auto;
`;

const col = css`
  max-width: 195px;
  margin: 0;
  padding: 0;
`;

const a = css`
  color: #000000;
  &:hover {
    text-decoration: none;
    color: #000000;
    transform: scale(1.05);
  }
`;

const card = css`
  cursor: pointer;
  &:hover {
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
  }
`;

const name = css`
  text-align: center;
`;

const MyPokemon = () => {

  const [state, dispatch] = useContext(MyPokemonContext);

  console.log(state)
  return (
    <div>
      <h1>All User!!</h1>
      {/* {pokemons.map((pokemon, index) => {
        return (
          <div key={index}>
            <a>
              <h3>{pokemon.name}</h3>
            </a>
          </div>
        );
      })} */}
    </div>
  );
};

export default MyPokemon;
