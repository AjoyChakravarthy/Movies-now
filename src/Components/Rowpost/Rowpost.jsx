import React, { useEffect, useState } from 'react'
import './Rowpost.css'
import axios from '../../axios'
import { imageUrl } from '../../constants/constants'
import { useNavigate } from 'react-router-dom';

function Rowpost(props) {
  const [movies, setMovies] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(props.url)
      .then(response => {
        // console.log(response.data.results)
        setMovies(response.data.results)
      })
      .catch(error => {
        console.error(error)
      });
  })

  const handleMovie = (id) => {
    navigate(`/movie/${id}`);
  };

  return (
    <div className='rowpost'>
      <h2>{props.title}</h2>
      <div className="row-posters">
        {movies.map((movie) =>
          <div key={movie.id} className='movie-posters'>
            <img onClick={() => handleMovie(movie.id)} className={props.isSmall ? 'poster-img-small' : 'poster-img'} src={`${imageUrl + movie.backdrop_path}`} alt="poster" />
            <h1 className='movie-title'>{movie.title}</h1>
          </div>
        )}
      </div>
    </div>
  )
}

export default Rowpost
