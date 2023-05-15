import React, {useContext} from 'react'
import { useParams } from 'react-router-dom'
import { UserContext } from '../App'

const MovieDetails = () => {
    const { searchResults, recommended, movies } = useContext(UserContext);
    const { id } = useParams()
    // Find the movie or TV show that matches the ID
    const movie = movies.find((result) => result.id === parseInt(id));
    console.log(movie);

  return (
    <div className='px-4 pt-20 '>{movie?.overview}</div>
  )
}

export default MovieDetails