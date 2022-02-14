import React, { useState, createContext } from 'react';
import axios from 'axios';


const PokeContext = createContext();
const API = 'https://pokeapi.co/api/v2/pokemon/';

export const PokeContextProvider = ({ children }) => {

    const [pokemons, setPokemons] = useState([]);

    const fetchPokemons = async () => {
        const res = await axios.get(`${API}?limit=20`);
        setPokemons(res.data.results);
    }


    return (
        <PokeContext.Provider value={{ fetchPokemons, pokemons }}>
            {children}
        </PokeContext.Provider>
    )
}

export default PokeContext;