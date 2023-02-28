import React, { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import { filterByCreateOrNot, filterByOrder, filterByTypes, getDetaildDataPoke, setCurrentPage } from '../redux/actions';
import Loader from './Loader';
import {Link} from 'react-router-dom'
import {BsArrowReturnLeft} from 'react-icons/bs'
import s from '../styles/PokeDetald.module.css'

const PokeDetaild = () => {
  const { id } = useParams();
  let getDataDetailsPoke = useSelector(e => e.getDataDetailsPoke)
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(getDetaildDataPoke(id))
  },[])

  const reset = () => {
    dispatch(setCurrentPage(1))
    dispatch(filterByTypes('All'))
    dispatch(filterByOrder('asc'))
    dispatch(filterByCreateOrNot('All'))
  }

  console.log(getDataDetailsPoke);
  return (
    <>
      {
        !getDataDetailsPoke.length ? <Loader/> : 
        getDataDetailsPoke.map(e =>   
          <div key={e.id} className={s.container}>
            <Link to={'/Home'} className={s.volver} onClick={()=>reset()}>
              <BsArrowReturnLeft/>
            </Link>
            <img src={e.image} alt="" />
            <div>
              <h2>{e.name}</h2>
              <div>
               de tipo
                {
                  e.types.map((i,index) => 
                  <h3 key={index}>{i.name}</h3>
                  )
                }
              </div>
              <h3>Numero de pokemon: {e.id}</h3>
              <h3>id: {e.id}</h3>
              <ul>
                estadisticas: 
                <li>Vida: {e.hp}</li>
                <li>ataque: {e.attack}</li>
                <li>defensa: {e.defense}</li>
                <li>velocidad: {e.speed}</li>
                <li>Altura: {e.height}</li>
                <li>peso: {e.weight}</li>
              </ul>
            </div>
          </div>
        )
      }
    </>
  )
}

export default PokeDetaild