import React, { useReducer, createContext, useEffect, useState } from "react";

export const MyPokemonContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POKEMON":
      return {
        pokemons: action.payload,
      };
    case "ADD_POKEMON":
      return {
        pokemons: [...state.pokemons, action.payload],
      };
    case "DELETE_POKEMON":
      return {
        pokemons: state.pokemons.filter(
          (pokemons) => pokemons.nickname !== action.payload
        ),
      };
    default:
      return state;
  }
};

let defaultmMyPokemon = {
  pokemons: []
};
const local = typeof window !== "undefined" && localStorage.getItem('state');
if (local) defaultmMyPokemon = JSON.parse(local);


export const Provider = ({ children, storageKey = "state" }) => {
  const [isInitialized, setIsInitialized] = useState(false);
  const [state, dispatch] = useReducer(reducer, defaultmMyPokemon);

  // useEffect(() => {
  //   dispatch({
  //     type: "SET_POKEMON",
  //     payload: JSON.parse(localStorage.getItem("state.pokemons")),
  //   });
  //   setIsInitialized(true);
  // }, []);

  useEffect(() => {
      localStorage.setItem("state", JSON.stringify(state));
  }, [state]);

  return (
    <MyPokemonContext.Provider value={[state, dispatch]}>
      {children}
    </MyPokemonContext.Provider>
  );
};
