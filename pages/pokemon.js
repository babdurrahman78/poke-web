import { ApolloClient, InMemoryCache, gql } from "@apollo/client";

export default function pokemon({poke}) {
  console.log(poke)
    return ( 
        <div>
            <h1>{poke.name}</h1>
        </div>
     );
}

export const getServerSideProps = async ({ query })  => {
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
      }

      catch(err) {
        console.log(err);
      }
}

