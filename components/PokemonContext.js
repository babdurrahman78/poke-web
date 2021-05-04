import React, { useReducer, createContext } from "react";

export const MyPokemonContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_POKEMON":
      return {
        pokemons: [...state.pokemons, action.payload],
      };
    default:
        return state;
  }
};

const myPokemon = {
    pokemons : []
}


export const Provider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, myPokemon);

  return (
    <MyPokemonContext.Provider value={[state, dispatch]}>
      {children}
    </MyPokemonContext.Provider>
  );
};

