import React, { useContext, useState } from "react";
import './WatchlistModal.css';
import { WatchlistContext } from "../../context/WatchListContext";
import { FaTrash, FaFilm } from 'react-icons/fa';
import { fetchMovieTrailer } from "../../api/tmdb";
import TrailerModal from "../homecomponents/trailerModal/TrailerModal";

const WatchlistModal = ({ onClose }) => {
  const { savedMovies, removeFromWatchlist } = useContext(WatchlistContext);
  const [trailerKey, setTrailerKey] = useState("");

  const handleMovieClick = async (movieId) => {
    try {
      const data = await fetchMovieTrailer(movieId);
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
      <div className="watchlistModalOverlay" onClick={onClose}>

        <div className="watchlistModalContent" onClick={(e) => e.stopPropagation()}>

          <div className="watchlistModalHeader">
            <h2>My Watchlist</h2>
            <button className="watchlistCloseBtn" onClick={onClose} aria-label="Close Watchlist">✕</button>
          </div>

          {savedMovies.length === 0 ? (
            <div className="watchlistEmptyState">
              <FaFilm className="watchlistEmptyIcon" />
              <p className="watchlistEmptyText">No saved movies yet</p>
              <p className="watchlistEmptySubtext">Explore trending shows and movies and click the "+" button to add them to your watchlist.</p>
              <button className="watchlistBrowseBtn" onClick={onClose}>
                Browse Movies
              </button>
            </div>
          ) : (
            <div className="watchlistPosterGrid">
              {savedMovies.map((movie) => (
                <div key={movie.firebaseId} className="watchlistPosterCard">

                  <div
                    className="watchlistPosterWrapper"
                    onClick={() => handleMovieClick(movie.id)}
                    style={{ cursor: 'pointer' }}
                    title="Click to play trailer"
                  >
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                        alt={movie.title}
                        className="watchlistPosterImg"
                      />
                    ) : (
                      <div className="watchlistPosterPlaceholder">
                        <span className="placeholderIcon"><FaFilm /></span>
                        <span className="placeholderTitle">{movie.title}</span>
                      </div>
                    )}

                    <button
                      className="watchlistCardBtn watchlistCardRemoveBtn"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFromWatchlist(movie.firebaseId);
                      }}
                      title="Remove from watchlist"
                      aria-label={`Remove ${movie.title} from watchlist`}
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <p className="watchlistMovieTitle">{movie.title}</p>

                </div>
              ))}
            </div>
          )}

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
};

export default WatchlistModal;