import { css } from "@emotion/react";
import { useState } from "react";
import {
  Card,
  CardTitle,
  CardImg,
  Button,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
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
`
const moveTitle = css`
  text-align: center;
`

const moveItem = css`
  margin-bottom: 5px;
  border-style: outset;
  font-weight: 500;
  text-align: center;
`

export default function pokemon({ poke }) {
  const [modal, setModal] = useState(false);
  const [isCatched, setIsCatched] = useState(false);

  const catchPokemon = () => {
    const randomNumber = Math.floor(Math.random() * 2);
    setIsCatched(randomNumber === 1 ? true : false)
    setModal(!modal);
    console.log(randomNumber);
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <Card css={card} body>
      <CardImg
        css={img}
        top
        width="200px"
        src={`${poke.sprites.front_default}`}
        alt={poke.name}
      />
      <CardTitle css={title} tag="h5">
        {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
      </CardTitle>
      <ul css={ul}>
        {poke.types.map((type, index) => {
          return (
            <li css={li} key={index}>
              {type.type.name}
            </li>
          );
        })}
      </ul>
      <ol css={move}>
        <h3 css={moveTitle}>Moves</h3>
        {poke.moves.map((move, index) => {
          return <li css={moveItem} key={index}>{move.move.name}</li>;
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
              <p>Give it a name</p>
            </div>
          ) : (
            <h3>Try Again :(</h3>
          )}
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggle}>
            Exit
          </Button>
        </ModalFooter>
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
