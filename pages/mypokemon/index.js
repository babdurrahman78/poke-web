import { useContext } from "react";
import { css } from "@emotion/react";
import { MyPokemonContext } from "../../components/PokemonContext";
import { Card, CardTitle, CardImg, Row, Col, Button } from "reactstrap";

const MyPokemon = () => {
  const [state, dispatch] = useContext(MyPokemonContext);

  const remove = (ev) => {
    dispatch({
      type: "DELETE_POKEMON",
      payload: ev.currentTarget.value,
    });
  };

  return (
    <div>
      <Row
        css={css`
          max-width: 1000px;
          margin: auto;
        `}
        className="justify-content-between"
      >
        {state.pokemons.length === 0 && (
          <>
            <p
              css={css`
                margin-top: 100px;
                width: 100%;
                text-align: center;
                font-size: 20px;
                font-weight: 500;
              `}
            >
              0 Pokemon owned.
            </p>
            <p
              css={css`
                margin-top: -20px;
                width: 100%;
                text-align: center;
                font-size: 20px;
                font-weight: 500;
              `}
            >
              Go catch some pokemon!
            </p>
          </>
        )}
        {state.pokemons &&
          state.pokemons.map((pokemon) => {
            return (
              <Col
                css={css`
                  max-width: 195px;
                  margin: 0;
                  padding: 0;
                `}
                className="col-6 col-xs-4 col-sm-3 col-md-3 col-lg-3 col-xl-4 mt-2"
                key={pokemon.nickname}
              >
                <a
                  css={css`
                    color: #000000;
                    &:hover {
                      text-decoration: none;
                      color: #000000;
                      transform: scale(1.05);
                    }
                  `}
                >
                  <Card
                    css={css`
                      cursor: pointer;
                      &:hover {
                        box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2);
                      }
                    `}
                    body
                  >
                    <CardImg
                      css={css`
                        width: 100px;
                        height: 100px;
                        margin: auto;
                      `}
                      top
                      width="100%"
                      src={pokemon.image}
                      alt={pokemon.name}
                    />
                    <CardTitle
                      css={css`
                        text-align: center;
                      `}
                      tag="h5"
                    >
                      {pokemon.nickname.charAt(0).toUpperCase() +
                        pokemon.nickname.slice(1)}
                    </CardTitle>
                    <CardTitle
                      css={css`
                        color: #a9a9a9;
                        text-align: center;
                      `}
                      tag="h5"
                    >
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </CardTitle>
                    <Button
                      color="danger"
                      value={pokemon.nickname}
                      onClick={remove}
                    >
                      Delete
                    </Button>
                  </Card>
                </a>
              </Col>
            );
          })}
      </Row>
    </div>
  );
};

export default MyPokemon;
