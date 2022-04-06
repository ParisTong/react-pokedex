import React, { useState, useEffect } from 'react';
import { Navbar, Container } from 'react-bootstrap';
import PokemonList from './PokemonList';
import Pagination from './Pagination';
import axios from 'axios';

import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

function App() {
  const [pokemons, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [nextPageUrl, setNextPageUrl] = useState();
  const [prevPageUrl, setPrevPageUrl] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    let cancel;

    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    }).then(res => {
      setLoading(false);

      setNextPageUrl(res.data.next);
      setPrevPageUrl(res.data.previous);
      //{name: ..., order: ..., imgUrl:...}
      setPokemon(res.data.results.map(p => {
        let order = p.url.slice(34, -1);
        return {
          name: p.name,
          order,
          imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${order}.png`
        };
      }));
    })

    return () => cancel();
  }, [currentPageUrl]);

  function gotoNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function gotoPrevPage() {
    setCurrentPageUrl(prevPageUrl);
  }


  // Will add an gif
  if (loading) {

  };

  return (
    <div className="App">
      <header>
        <Navbar variant="dark" bg="dark" sticky="top">
          <Navbar.Brand style={{ "marginLeft": "20px" }}><span>Pokedex</span></Navbar.Brand>
        </Navbar>
        <div fluid="true" className="pokedex-banner">
          <Container>
            <h1>A Pokemon Gallery</h1>
          </Container>
        </div>
      </header>

      <main>
        <div className="upper-page-button">
          <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />
        </div>

        <div className="pokemon-list">
          <PokemonList pokemons={pokemons} />
        </div>

        <div className="lower-page-button">
          <Pagination
            gotoNextPage={nextPageUrl ? gotoNextPage : null}
            gotoPrevPage={prevPageUrl ? gotoPrevPage : null}
          />
        </div>
      </main>
    </div >
  );
}

export default App;