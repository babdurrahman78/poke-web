import { css } from "@emotion/react";
import { Card, CardTitle, CardImg, Row, Col } from "reactstrap";
import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

const title = css`
  text-align: center
`;

export default function pokemon({ poke }) {
  console.log(poke)
  return (
    <Card body>
      <CardImg
        top
        width="200px"
        src={`${poke.sprites.front_default}`}
        alt={poke.name}
      />
      <CardTitle css={title} tag="h5">
        {poke.name.charAt(0).toUpperCase() + poke.name.slice(1)}
      </CardTitle>
      <ul>
      {poke.types.map((type, index) => {
        return (
          <li key={index}>{type.type.name}</li>
        )
      })}
      </ul>
      <ol>
        {poke.moves.map((move,index) => {
          return (
            <li key={index}>{move.move.name}</li>
          )
        })}
      </ol>
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
