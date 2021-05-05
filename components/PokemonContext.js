import React, { useReducer, createContext, useEffect, useState } from "react";

export const MyPokemonContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_POKEMON":
      return {
        pokemons: action.payload
      };
    case "ADD_POKEMON":
      return {
        pokemons: [...state.pokemons, action.payload],
      };
    case "DELETE_POKEMON":
      return {
        pokemons: state.pokemons.filter(
          pokemons => pokemons.nickname !== action.payload
        )
      }
    default:
        return state;
  }
};

const myPokemon = {
    pokemons : []
}


export const Provider = ({ children, storageKey = 'state' }) => {
  // const [isInitialized, setIsInitialized] = useState(false);

  const [state, dispatch] = useReducer(reducer, myPokemon);

  // useEffect(() => {
    
  //   localStorage.setItem('state', JSON.stringify(state));
  //   setIsInitialized(true);

  // }, [state]);

 
  // useEffect(() => {
  //     if(isInitialized){
  //       dispatch({
  //         type: "SET_POKEMON",
  //         payload: JSON.parse(localStorage.getItem('state.pokemons'))
  //       });
  //     }
  // },[]);


  return (
    <MyPokemonContext.Provider value={[state, dispatch]}>
      {children}
    </MyPokemonContext.Provider>
  );
};

