import './Banner.css';
import axios from '../../axios';
import React, { useEffect, useState } from 'react';
import { API_KEY, imageUrl } from '../../constants/constants';
import { useNavigate } from 'react-router-dom'


function Banner({ movie }) {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://api.themoviedb.org/3/trending/all/week?api_key=${API_KEY}&language=en-US`)
      .then(response => {
        // console.log('API Response:', response.data.results);
        setMovies(response.data.results);
        const initialIndex = Math.floor(Math.random() * Math.min(response.data.results.length, 10));
        setCurrentIndex(initialIndex);
      })
      .catch(error => {
        console.error('Error:', error);
      });

    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const maxIndex = Math.min(movies.length, 10);
        const newIndex = Math.floor(Math.random() * maxIndex);
        return newIndex;
      });
    }, 5000);

    return () => clearInterval(intervalId);
  }, [API_KEY, movies.length]);

  const handlePrevious = () => {
    setCurrentIndex(prevIndex => (prevIndex === 0 ? Math.min(movies.length, 10) - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex === Math.min(movies.length, 10) - 1 ? 0 : prevIndex + 1));
  };

  if (movies.length === 0) {
    return <div className='loading'>Loading...</div>;
  }

  const handleMovie = (id) => {
    navigate(`/movie/${id}`)
  }

  const currentMovie = movies[currentIndex];

  return (
    <div
      style={{
        backgroundImage: `url(${movies.length > 0 ? imageUrl + movies[currentIndex].backdrop_path : ""})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
      className='banner'>
      <div className='banner-content'>
        <div className='info'>
          <p className="rating"><i class="fa-solid fa-star "></i>{movies.length > 0 ? Math.round(movies[currentIndex].vote_average * 10) / 10 : ""}</p>
          <p className="date"><i class="fa-solid fa-circle-dot"></i>{movies.length > 0 ? new Date(movies[currentIndex].release_date).getFullYear() : ""}</p>
        </div>
        <h1 className='movie-title'>{movies.length > 0 ? movies[currentIndex].original_title || movies[currentIndex].name : ""}</h1>
        <div className='banner-button'>
          <button className='button' onClick={() => { handleMovie(currentMovie.id) }}>Play <i class="fa-solid fa-play"></i></button>
        </div>
        <p className='description'>{movies.length > 0 ? movies[currentIndex].overview.substring(0, 220) : ""}</p>
      </div>
      <div className='navigation-buttons'>
        <button onClick={handlePrevious} className='button'><i class="fa-solid fa-arrow-left"></i></button>
        <button onClick={handleNext} className='button'><i class="fa-solid fa-arrow-right"></i></button>
      </div>
    </div>
  );
}

export default Banner;
