import React from 'react'
import { useNavigate, useNavigation } from 'react-router'

const PokemonThumb = ({ id, image, name, types, type, _callback }) => {
  const style = type + ' thumb-container'
  const navigation = useNavigate()

  const redirectDetail = id => {
    //
    navigation(`/pokemon/${id}`)
  }
  return (
    <div className={style} onClick={() => redirectDetail(id)}>
      {types.map(type => {
        return (
          <button className='button-types disabled-types'>
            {type.type.name}
          </button>
        )
      })}

      <div className='number'>
        <small>#0{id}</small>
      </div>
      <img src={image} alt={name} />
      <div className='detail-wrapper'>
        <div className='text-bottom'>
          <h3>{name}</h3>
          <small>Type: {type}</small>
        </div>
      </div>
    </div>
  )
}

export default PokemonThumb
