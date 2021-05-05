import { useContext } from 'react';
import { css } from "@emotion/react";
import { MyPokemonContext } from '../../components/PokemonContext';
import { Card, CardTitle, CardImg, Row, Col, Button } from "reactstrap";

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
  console.log(state);
  return (
    <Row css={row} className="justify-content-between">
      {state.pokemons && state.pokemons.map((pokemon, index) => {
        return (
          <Col
            css={col}
            className="col-6 col-xs-4 col-sm-3 col-md-3 col-lg-3 col-xl-4 mt-2"
            key={index}
          >
            <a css={a}>
              <Card css={card} body>
                <CardImg
                  css={img}
                  top
                  width="100%"
                  src={pokemon.image}
                  alt={pokemon.name}
                />
                <CardTitle css={name} tag="h5">
                  {pokemon.nickname.charAt(0).toUpperCase() + pokemon.nickname.slice(1)}
                </CardTitle>
                <CardTitle css={name} tag="h5">
                  {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
                </CardTitle>
                <Button color="danger" onClick={delete}>
                  Delete
                </Button>
              </Card>
            </a>
          </Col>
        );
      })}
    </Row>
  );
};

export default MyPokemon;
