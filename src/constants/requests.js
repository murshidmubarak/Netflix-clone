import {
  fetchTrending,
  fetchTopRated,
  fetchActionMovies,
  fetchComedyMovies
} from '../api/tmdb'

const requests = [

  {
    title: 'Trending Now',
    fetcher: fetchTrending
  },

  {
    title: 'Top Rated',
    fetcher: fetchTopRated
  },

  {
    title: 'Action Movies',
    fetcher: fetchActionMovies
  },

  {
    title: 'Comedy Movies',
    fetcher: fetchComedyMovies
  }

]

export default requests