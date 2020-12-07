import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pokemon from './components/pokemon/Pokemon';
import Button from './components/button/Button';
import './App.css';

function App() {
  const [pokemons, setPokemons] = useState(null);
  const [endpoint, setEndpoint] = useState('https://pokeapi.co/api/v2/pokemon/');
  const [loading, toggleLoading] = useState(false);

  useEffect(() => {
    async function fetchData() {
      toggleLoading(true);

      try {
        const result = await axios.get(endpoint);
        setPokemons(result.data);
        toggleLoading(false);
      } catch(e) {
        console.error(e);
        toggleLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  return (
    <div className="poke-deck">
      {pokemons &&
        <>
          <img alt="logo" width="400px" src="https://1000merken.com/wp-content/uploads/2020/05/Pokemon-Logo.png"/>
          <section className="button-bar">
            <Button disabled={!pokemons.previous} clickHandler={() => setEndpoint(pokemons.previous)}>
              Vorige
            </Button>
            <Button disabled={!pokemons.next} clickHandler={() => setEndpoint(pokemons.next)}>
              Volgende
            </Button>
          </section>

          {pokemons.results.map((pokemon) => {
            return <Pokemon key={pokemon.name} endpoint={pokemon.url} />
          })}
        </>
      }
      {loading && <p>Loading...</p>}
    </div>
  );
}

export default App;
