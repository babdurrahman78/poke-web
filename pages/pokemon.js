import { css } from "@emotion/react";
import { useState, useContext } from "react";
import { MyPokemonContext } from "../components/PokemonContext";

import {
  Card,
  CardTitle,
  CardImg,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const card = css`
  margin: 0;
  padding: 10;
`;

const title = css`
  text-align: center;
`;

const img = css`
  width: 100px;
  height: 100px;
  margin: auto;
`;

const move = css`
  padding: 0;
  height: 300px;
  overflow: auto;
`;
const ul = css`
  width: 50%;
  margin: 0 auto 20px;
  display: flex;
  justify-content: center;
`;

const li = css`
  margin-right: 40px;
`;

const button = css`
  position: absolute;
  bottom: 0;
`;
const moveTitle = css`
  text-align: center;
`;

const moveItem = css`
  margin-bottom: 5px;
  border-style: outset;
  font-weight: 500;
  text-align: center;
`;

export default function pokemon({ poke }) {
  const [state, dispatch] = useContext(MyPokemonContext);

  const allnick = state.pokemons.map((pokemon) => {
    return pokemon.nickname;
  });

  const [modal, setModal] = useState(false);
  const [isCatched, setIsCatched] = useState(false);
  const [nickname, setNickname] = useState("");

  const name = poke.name;
  const image = poke.sprites.front_default;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPokemon = {
      nickname,
      name,
      image,
    };

    setNickname("");
    dispatch({
      type: "ADD_POKEMON",
      payload: newPokemon,
    });
    setModal(!modal);
  };

  const catchPokemon = () => {
    const randomNumber = Math.random();
    setIsCatched(randomNumber < 0.5 ? true : false);
    setModal(!modal);
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Card
      css={css`
        margin: 0;
        padding: 10;
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
        width="200px"
        src={`${poke.sprites.front_default}`}
        alt={poke.name}
      />
      <CardTitle
        css={css`
          text-align: center;
        `}
        tag="h5"
      >
        {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
      </CardTitle>
      <ul
        css={css`
          width: 50%;
          margin: 0 auto 20px;
          display: flex;
          justify-content: center;
        `}
      >
        {poke.types.map((type, index) => {
          return (
            <li
              css={css`
                margin-right: 40px;
              `}
              key={index}
            >
              {type.type.name}
            </li>
          );
        })}
      </ul>
      <ol
        css={css`
          padding: 0;
          height: 300px;
          overflow: auto;
        `}
      >
        <h3
          css={css`
            text-align: center;
          `}
        >
          Moves
        </h3>
        {poke.moves.map((move, index) => {
          return (
            <li
              css={css`
                margin-bottom: 5px;
                border-style: outset;
                font-weight: 500;
                text-align: center;
              `}
              key={index}
            >
              {move.move.name}
            </li>
          );
        })}
      </ol>
      <Button onClick={catchPokemon} color="success" block>
        CATCH!
      </Button>{" "}
      <Modal isOpen={modal}>
        <ModalBody>
          {isCatched ? (
            <div>
              <h3>Yeayyy</h3>
              <p>You got {poke.name}</p>
              <form onSubmit={handleSubmit}>
                <label>Give a name</label>
                <input
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                ></input>
                <Button color='success'>
                  Submit
                </Button>
              </form>
            </div>
          ) : (
            <div>
              <h3>Try Again :(</h3>
              <Button color="danger" onClick={toggle}>
                Retry
              </Button>
            </div>
          )}
        </ModalBody>
      </Modal>
    </Card>
  );
}

export const getServerSideProps = async ({ query }) => {
  const name = query.name;
  const client = new ApolloClient({
    uri: "https://graphql-pokeapi.vercel.app/api/graphql",
    cache: new InMemoryCache(),
  });

  try {
    const { data } = await client.query({
      query: gql`
        query pokemon($name: String!) {
          pokemon(name: $name) {
            id
            name
            sprites {
              front_default
            }
            moves {
              move {
                name
              }
            }
            types {
              type {
                name
              }
            }
          }
        }
      `,
      variables: {
        name: name,
      },
    });

    return {
      props: { poke: data.pokemon },
    };
  } catch (err) {
    console.log(err);
  }
};
