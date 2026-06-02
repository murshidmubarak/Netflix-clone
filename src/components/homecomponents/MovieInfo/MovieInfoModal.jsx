import React, { useState } from 'react';
import './MovieInfoModal.css';
import { FaPlay } from 'react-icons/fa';
import { fetchMovieTrailer } from '../../../api/tmdb';
import TrailerModal from '../trailerModal/TrailerModal';

export default function MovieInfoModal({
  movie,
  onClose
}) {
  const [trailerKey, setTrailerKey] = useState("");

  const handlePlayTrailer = async () => {
    try {
      const data = await fetchMovieTrailer(movie.id);
      const trailer = data.find(
        (video) =>
          video.type === 'Trailer' &&
          video.site === 'YouTube'
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        alert("Sorry, no trailer available for this movie.");
      }
    } catch (error) {
      console.error("Error fetching trailer:", error);
    }
  };

  return (
    <>
      <div
        className="movieModalOverlay"
        onClick={onClose}
      >
        <div
          className="movieModal"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="closeBtn"
            onClick={onClose}
          >
            ✕
          </button>

          <img
            className="movieBackdrop"
            src={`https://image.tmdb.org/t/p/w780${movie.backdrop_path || movie.poster_path}`}
            alt={movie.title || movie.name}
          />

          <div className="movieContent">
            <h2>{movie.title || movie.name}</h2>

            <div className="movieMeta">
              <span><strong>Release:</strong> {movie.release_date || movie.first_air_date}</span>
              <span><strong>Rating:</strong> ⭐ {movie.vote_average?.toFixed(1) || "N/A"}</span>
            </div>

            <p className="movieOverview">{movie.overview}</p>

            <button className="infoPlayBtn" onClick={handlePlayTrailer}>
              <FaPlay className="playIcon" /> Play Trailer
            </button>
          </div>
        </div>
      </div>

      {trailerKey && (
        <TrailerModal
          trailerKey={trailerKey}
          closeTrailer={() => setTrailerKey("")}
        />
      )}
    </>
  );
}