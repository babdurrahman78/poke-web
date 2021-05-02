export const getStaticProps = async () => {
  const res = await fetch("https://pokeapi.co/api/v2/pokemon");
  const data = await res.json();

  return {
    props: { pokemons: data.results },
  };
};

const User = ({ pokemons }) => {
  return (
    <div>
      <h1>All User!!</h1>
      {pokemons.map((pokemon, index) => {
        return (
          <div style={{margin: "auto", width: "500px"}} key={index}>
            <a>
              <h3>{pokemon.name}</h3>
            </a>
          </div>
        );
      })}
    </div>
  );
};

export default User;
