import axios from 'axios';
import { useReducer } from 'react';
function App() {
  const moviesState = {
    searchedMovies: [],
    sideBar: {
      comingSoon: [],
      nowPlaying: [],
      trending: [],
      topRated: [],
    },
  };
  const moviesActions = {
    POPULAR_MOVIES: 'popular_movies',
    // TOP_RATED: 'top_rated',
    // NOW_PLAYING: 'now_playing',
    // TRENDING: 'trending',
    // COMING_SOON: 'coming_soon'
    SIDEBAR: 'sidebar',
  };

  const moviesReducer = (state, action) => {
    switch (action.type) {
      case moviesActions.POPULAR_MOVIES:
        return { searchedMovies: [action.payload.popular] };
      case moviesActions.SIDEBAR:
        return { sideBar: [action.payload.sidebar] };
      default:
        return state;
    }
  };

  const [state, moviesDispatch] = useReducer(moviesReducer, moviesState);

  const handlePopularMovies = async () => {
    const { data } = await axios.get(
      'https://api.themoviedb.org/3/movie/popular?api_key=8efd5c56d10b8332b9691c3d750ff1bb&language=en-US&page=1',
    );
    moviesDispatch({
      type: moviesActions.POPULAR_MOVIES,
      payload: { popular: { data } },
    });
  };
  const handleSideBarData = async () => {
    const {
      data: { results: comingSoonData },
    } = await axios.get(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=8efd5c56d10b8332b9691c3d750ff1bb&language=en-US&page=1',
    );
    const {
      data: { results: nowPlayingData },
    } = await axios.get(
      ' https://api.themoviedb.org/3/movie/now_playing?api_key=8efd5c56d10b8332b9691c3d750ff1bb&language=en-US&page=1',
    );
    const {
      data: { results: trendingData },
    } = await axios.get(
      'https://api.themoviedb.org/3/trending/movie/week?api_key=8efd5c56d10b8332b9691c3d750ff1bb',
    );
    const {
      data: { results: topRatedData },
    } = await axios.get(
      'https://api.themoviedb.org/3/movie/top_rated?api_key=8efd5c56d10b8332b9691c3d750ff1bb&language=en-US&page=1',
    );
    moviesDispatch({
      type: moviesActions.SIDEBAR,
      payload: {
        sidebar: {
          comingSoon: comingSoonData,
          nowPlaying: nowPlayingData,
          trending: trendingData,
          topRated: topRatedData,
        },
      },
    });
  };

  return (
    <div className="App">
      <button onClick={handleSideBarData}>popular</button>
      <button onClick={console.log(state.sideBar)}>log</button>
    </div>
  );
}

export default App;
