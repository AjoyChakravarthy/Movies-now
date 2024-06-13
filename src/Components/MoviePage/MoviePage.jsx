import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../../axios';
import YouTube from 'react-youtube';
import { API_KEY } from '../../constants/constants';
import './MoviePage.css'

function MoviePage() {
  const { id } = useParams();
  const [urlId, setUrlId] = useState('');
  const [movie, setMovie] = useState([])

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
      .then(response => {
        setMovie(response.data);
        // console.log(response.data)
      })
      .catch(error => {
        console.error(error);
      });
    axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${API_KEY}`)
      .then(response => {
        if (response.data.results.length !== 0) {
          setUrlId(response.data.results[0].key);
        } else {
          console.log("Trailer not available");
        }
      })
      .catch(error => {
        console.error(error);
      });
  }, [id]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 0,
    },
  };

  return (
    <div className='movie-page'>
      <div className='play'>{urlId ? <YouTube opts={opts} videoId={urlId} /> : <p>Trailer not available</p>}</div>
      <div className='content'>
        <h1>{movie.title}</h1>
        <p>Rating: <i class="fa-solid fa-star "></i> {Math.round(movie.vote_average * 10) / 10}</p>
        <p>Popularity: {movie.popularity}</p>
        <p>Release Date: {movie.release_date}</p>
        <p>RunTime: {movie.runtime} minute</p>
        {movie.genres && (
          <ul>
            <p>Genres</p>
            {movie.genres.map((genre) => (
              <li key={genre.id}>{genre.name}</li>
            ))}
          </ul>
        )}
        <p className='description'>{movie.overview}</p>
      </div>
    </div>
  );
}

export default MoviePage;

