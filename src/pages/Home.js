import axios from 'axios'
import { useEffect, useState } from 'react'
import PokemonThumb from '../components/PokemonThumb'
import { redirect, useNavigate } from 'react-router'

export default function HomePage () {
  const [pokemon, setPokemon] = useState([])
  const navigation = useNavigate()

  const getPokemonData = async id => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return res
  }
  const getPokemonList = async () => {
    let pokemonArray = []
    for (let i = 1; i <= 20; i++) {
      pokemonArray.push(await getPokemonData(i))
    }
    setPokemon(pokemonArray)
  }

  useEffect(() => {
    getPokemonList()
  }, [])

  const redirectDetail = id => {
    // e.preventDefault()
    navigation(`pokemon/${id}`)
  }

  return (
    <div className='app-contaner'>
      <h1>Pokedex</h1>
      <div className='pokemon-container'>
        <div className='all-container'>
          <div className='container'>
            <div class='row'>
              {pokemon.map((pokemonStats, index) => (
                <PokemonThumb
                  //   onClick={redirectDetail(pokemonStats.data.id)}
                  key={index}
                  id={pokemonStats.data?.id}
                  image={
                    pokemonStats.data?.sprites.other.dream_world.front_default
                  }
                  name={pokemonStats.data?.name}
                  types={pokemonStats.data?.types}
                  type={pokemonStats.data?.types[0].type.name}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
