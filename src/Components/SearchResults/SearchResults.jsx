import React from 'react'
import './SearchResults.css'
import { useNavigate } from 'react-router-dom'

function SearchResults({ results }) {
  console.log(results)
  const navigate = useNavigate();
  const handleMovie = (id) => {
    navigate(`/movie/${id}`)
  }

  return (
    <div className='results'>
      <h1 >Search Results</h1>
      {results.length === 0 ? (
        <div><p>Result not found</p></div>
      )
        :
        (
          <div className="results-card">
            {results.map((movie) =>
              <div className='grid-col'>
                <div className='posters'>
                  <img onClick={(() => { handleMovie(movie.id) })} src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={`${movie.original_title}Poster`} />
                  <h2 >{movie.title}</h2>
                  <p>Year: {movie.release_date.substring(0, 4)}</p>
                </div>
              </div>
            )}
          </div>
        )}

    </div>
  )
}

export default SearchResults
