import { css } from "@emotion/react";
import { useState, useContext } from "react";
import { MyPokemonContext } from "../context/PokemonContext";
import client from '../apollo-client';

import {
  Card,
  CardTitle,
  CardImg,
  Button,
  Modal,
  ModalBody,
} from "reactstrap";

import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import { GET_POKEMON } from '../graphql/fetchPokemon';

export default function pokemon({ poke }) {
  const [state, dispatch] = useContext(MyPokemonContext);

  const allnick = state.pokemons.map((pokemon) => {
    return pokemon.nickname || null;
  });

  const [modal, setModal] = useState(false);
  const [isCatched, setIsCatched] = useState(false);
  const [nickname, setNickname] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false);

  const name = poke.name;
  const image = poke.sprites.front_default;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNickname = nickname.toLowerCase();

    const newPokemon = {
      nickname: newNickname,
      name,
      image,
    };

    if(allnick.includes(newNickname)){
      setIsDuplicate(true);
      setTimeout(() => {
        setIsDuplicate(false);
      }, 2000);
    }
    else{
      dispatch({
        type: "ADD_POKEMON",
        payload: newPokemon,
      });
      setNickname("");
      setModal(!modal);
    }
  };


  const catchPokemon = () => {
    const randomNumber = Math.random();
    if(randomNumber < 0.5){ 
      setIsCatched(true);
      
    }
    else{
      setIsCatched(false);
    }
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
      <Modal isOpen={modal} size='sm'>
        <ModalBody 
        css={css`
          margin: auto;
      `}>
          {isCatched ? (
            <div css={
              css`
                display: flex;
                flex-direction: column;
                align-items: center;
              `
            } >
              <h3>Yeayyy</h3>
              <p>You got {poke.name}</p>
              <form onSubmit={handleSubmit}>
                <label>Name the pokemon!</label>
                <input css={css`
                  display: block;
                  margin-bottom: 5px;
                `}
                  type="text"
                  required
                  value={nickname}
                  onChange={(e) => setNickname(e.target.value)}
                ></input>
                {isDuplicate && <p css={css`
                  color: red;
                  font-weight: 500;
                `}>Nickname must be unique</p> }
                <div css={
                  css`
                    display: flex;
                    justify-content: space-between;
                  `
                }>
                  <Button color='success'>
                    Submit
                  </Button>
                  <Button color='danger' onClick={toggle}>
                    Cancel
                  </Button>
                </div>
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

  try {
    const { data } = await client.query({
      query: GET_POKEMON,
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