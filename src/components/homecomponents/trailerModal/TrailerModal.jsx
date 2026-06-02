import React from 'react'
import './TrailerModal.css'

const TrailerModal = React.memo(
  ({ trailerKey, closeTrailer }) => {

    return (

      <div className='trailerModalOverlay' onClick={closeTrailer}>

        <div className='trailerModalContent' onClick={(e) => e.stopPropagation()}>

          <button
            className='trailerCloseBtn'
            onClick={closeTrailer}
          >
            ✕
          </button>

          <iframe
            className='trailerIframe'
            src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
            title="Trailer"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>

        </div>

      </div>
    )
  }
)

export default TrailerModal