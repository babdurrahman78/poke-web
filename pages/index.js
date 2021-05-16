import Link from "next/link";
import { useContext, useState } from "react";
import { css } from "@emotion/react";
import { MyPokemonContext } from "../context/PokemonContext";
import { Card, CardTitle, CardImg, Row, Col } from "reactstrap";
import { GET_ALL_POKEMON } from "../graphql/fetchPokemon";
import client from "../apollo-client";
import InfiniteScroll from "react-infinite-scroll-component";

export default function Home({ pokemons }) {
  const [state] = useContext(MyPokemonContext);
  const [myPokemons, setMyPokemons] = useState(pokemons);
  const [hasMore, setHasMore] = useState(true);

  const fetchMoreData = async () => {
    const { data } = await client.query({
      query: GET_ALL_POKEMON,
      variables: {
        limit: 20,
        offset: myPokemons.length,
      },
    });
    setMyPokemons([...myPokemons, ...data.pokemons.results]);
  };

  return (
    <InfiniteScroll
      dataLength={myPokemons.length}
      hasMore={true}
      next={fetchMoreData}
      loader={
        <h5
          css={css`
            text-align: center;
            color: #a9a9a9;
          `}
        >
          loading...
        </h5>
      }
    >
      <div>
        {state.pokemons && (
          <h3
            css={css`
              text-align: center;
              color: #a9a9a9;
            `}
          >
            Pokemon owned Total : {state.pokemons.length}
          </h3>
        )}

        <Row
          css={css`
            max-width: 1000px;
            margin: auto;
          `}
          className="justify-content-between"
        >
          {myPokemons.map((pokemon, index) => (
            <Col
              css={css`
                max-width: 195px;
                margin: 0;
                padding: 0;
              `}
              className="col-6 col-xs-4 col-sm-3 col-md-3 col-lg-3 col-xl-4 mt-2"
              key={index}
            >
              <Link href={`/pokemon?name=${pokemon.name}`}>
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
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </CardTitle>
                  </Card>
                </a>
              </Link>
            </Col>
          ))}
        </Row>
      </div>
    </InfiniteScroll>
  );
}

export const getStaticProps = async () => {
  try {
    const { data } = await client.query({
      query: GET_ALL_POKEMON,
      variables: {
        limit: 20,
        offset: 0,
      },
    });

    return {
      props: { pokemons: data.pokemons.results },
    };
  } catch (err) {
    console.log(err);
  }
};
