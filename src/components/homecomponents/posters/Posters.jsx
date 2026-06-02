import { FaPlus, FaInfoCircle } from 'react-icons/fa';
import { useCallback, useEffect, useRef, useState } from 'react'
import './Posters.css'
import MovieInfoModal from '../MovieInfo/MovieInfoModal';
import TrailerModal from '../trailerModal/TrailerModal'
import { useContext } from 'react';
import { WatchlistContext } from '../../../context/WatchListContext';
import { fetchMovieTrailer } from '../../../api/tmdb'

const Posters = ({ title, fetchMovies }) => {

  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedMovie, setSelectedMovie] = useState(null);

  const { addToWatchlist } =useContext(WatchlistContext);

  // Trailer State
  const [trailerKey, setTrailerKey] = useState('')

  const observer = useRef()

  const closeTrailer = useCallback(() => {

  setTrailerKey('')

}, [])



  // Fetch Movies
  const getData = async () => {

    try {

      setLoading(true)

      const data = await fetchMovies(page)

      // Remove Duplicate Movies
      setMovies((prev) => {

        const combinedMovies = [...prev, ...data]

        const uniqueMovies = combinedMovies.filter(
          (movie, index, self) =>
            index === self.findIndex(
              (m) => m.id === movie.id
            )
        )

        return uniqueMovies
      })

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)
    }
  }

  // Fetch Trailer
  const handleMovieClick = async (movieId) => {

    try {

      const data = await fetchMovieTrailer(movieId)

      const trailer = data.find(
        (video) =>
          video.type === 'Trailer' &&
          video.site === 'YouTube'
      )

      if (trailer) {

        setTrailerKey(trailer.key)
      }

    } catch (error) {

      console.log(error)
    }
  }

  // First Fetch
  useEffect(() => {

    getData()

  }, [])

  // Fetch When Page Changes
  useEffect(() => {

    if (page > 1) {

      getData()
    }

  }, [page])

  // Infinite Scroll
  const lastMovieRef = useCallback((node) => {

    if (loading) return

    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver((entries) => {

      if (entries[0].isIntersecting) {

        setPage((prev) => prev + 1)
      }
    })

    if (node) observer.current.observe(node)

  }, [loading])

  return (

    <div className='row'>

      <h2>{title}</h2>

      
      <div className='posters'>

  {movies.map((movie, index) => (

    <div
      key={`${movie.id}-${index}`}
      className='posterWrapper'
    >

      <button
      className='watchlistBtn'
       onClick={(e) => {
       e.stopPropagation();
       console.log(movie.title);
       addToWatchlist(movie);
      }}
      >
     <FaPlus />
     </button>

      <button
        className='infoBtn'
         onClick={(e) => {
         e.stopPropagation();
         setSelectedMovie(movie);
        }}
      >
        <FaInfoCircle />
      </button>

      <img
        onClick={() => handleMovieClick(movie.id)}
        ref={movies.length === index + 1 ? lastMovieRef : null}
        loading='lazy'
        className='poster'
        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
        alt={movie.title}
      />

      {loading && movies.length === index + 1 && (
        <div className='smallLoader'></div>
      )}

    </div>

  ))}

</div>

      {/* Trailer Modal */}
      {trailerKey && (

        <TrailerModal
          trailerKey={trailerKey}
          closeTrailer={closeTrailer}
        />

      )}

      {selectedMovie && (
  <MovieInfoModal
    movie={selectedMovie}
    onClose={() => setSelectedMovie(null)}
  />
)}

    </div>
  )
}

export default Posters