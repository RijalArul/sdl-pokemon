import axios from 'axios'
import { useEffect, useState } from 'react'
import { Tabs, Tab, Card } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { Bar } from 'react-chartjs-2'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function DetailPage () {
  const [pokemon, setPokemon] = useState({})
  const [style, setStyle] = useState('')
  const [selectAbility, setSelectAbility] = useState('')
  const [chartData, setChartData] = useState({
    datasets: []
  })
  const [chartOptions, setChartOptions] = useState({})

  const { id } = useParams()

  useEffect(() => {
    const pokemonData = async id => {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${parseInt(id)}`
      )

      const { data } = res
      setPokemon(data)
      setStyle(data.types[0].type.name + ' detail-body')
      setSelectAbility(data.types[0].type.name + ' button-ability')
    }

    pokemonData(id)
  }, [id])

  let statsPoke = []
  useEffect(() => {
    if (chartData !== null && chartOptions !== null) {
      pokemon.stats?.map(stat => {
        statsPoke.push(stat.base_stat)
        setChartData({
          labels: [
            'hp',
            'attack',
            'defense',
            'special-attack',
            'special-defence',
            'speed'
          ],
          datasets: [
            {
              data: [
                statsPoke[0],
                statsPoke[1],
                statsPoke[2],
                statsPoke[3],
                statsPoke[4],
                statsPoke[5]
              ],
              label: 'Power Heroes',
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: [
                'rgba(0, 247, 128, 0.8)',
                'rgba(219, 0, 0, 0.74)',
                'rgba(38, 188, 7, 0.74)',
                'rgba(11, 95, 185, 0.85)',
                'rgba(242, 127, 70, 0.85)',
                'rgba(245, 213, 70, 0.85)'
              ]
            }
          ]
        })
      })

      setChartOptions({
        responsive: true,
        plugins: {
          legend: {
            position: 'top'
          },
          title: {
            display: true,
            text: 'Strengths'
          }
        }
      })
    }
  }, [chartData, chartOptions])

  return (
    <div className={style}>
      <div className='intro-pokemon'>
        <h1>{pokemon.name}</h1>
        <br />
        <h4>{pokemon.id}</h4>
        {/* </br> */}
        <br />
        {pokemon.types?.map(type => {
          return (
            <button className='button-types disabled-types'>
              {type.type.name}
            </button>
          )
        })}
      </div>
      <div className='app-contaner'>
        <img
          className='detail-image'
          src={pokemon.sprites?.other.dream_world.front_default}
        />
        <div className='container'>
          <Card style={{ width: '90%' }}>
            <div>
              <Tabs
                defaultActiveKey='about'
                id='uncontrolled-tab-example'
                className='mb-3 justify-content-md-center mt-1'
                xs
                lg='2'
              >
                <Tab eventKey='about' title='About'>
                  <Card.Body>
                    <Card.Title>Species: {pokemon.species?.name}</Card.Title>
                    <Card.Title>Height: {pokemon.height}</Card.Title>
                    <Card.Title>Weight: {pokemon.weight}</Card.Title>
                    <Card.Title>
                      Abilities :
                      {pokemon.abilities?.map(ability => {
                        return (
                          <button className={selectAbility}>
                            {ability.ability.name}
                          </button>
                        )
                      })}
                    </Card.Title>
                  </Card.Body>
                </Tab>
                <Tab eventKey='stats' title='Base Stats'>
                  <Card.Body>
                    <Bar options={chartOptions} data={chartData} />
                  </Card.Body>
                </Tab>
                <Tab eventKey='moves' title='Move'>
                  <Card.Body>
                    <Card.Title>
                      {pokemon.moves?.map(move => {
                        return (
                          <button className={selectAbility}>
                            {move.move.name}
                          </button>
                        )
                      })}
                    </Card.Title>
                  </Card.Body>
                </Tab>
              </Tabs>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
