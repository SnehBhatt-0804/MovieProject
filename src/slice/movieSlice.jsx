import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const apiKey = "2b2b15fa10d49065ed67fcaaa77f9afc";

const initialState = {
  movies: [],
  movieDetails: null,
  searchQuery: "",
  genreId: "", // Added to manage selected genre
  sortBy: "popularity.desc", // Default sort option
  currentPage: 1,
  totalPages: 0,
  genres: [], // Added to store genres
};

// Async thunks
export const fetchPopularMovies = createAsyncThunk(
  "movie/fetchPopularMovies",
  async (page) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`
    );
    return response.data;
  }
);

export const fetchMovieDetails = createAsyncThunk(
  "movie/fetchMovieDetails",
  async (movieId) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    );
    return response.data;
  }
);

export const searchMovies = createAsyncThunk(
  "movie/searchMovies",
  async ({ query, page }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${apiKey}&language=en-US&page=${page}`
    );
    return response.data;
  }
);

export const fetchMoviesByGenre = createAsyncThunk(
  "movie/fetchMoviesByGenre",
  async ({ genreId, sortBy, page }) => {
    const response = await axios.get(
      `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=${sortBy}&with_genres=${genreId}&page=${page}`
    );
    return response.data;
  }
);

export const fetchGenres = createAsyncThunk("movie/fetchGenres", async () => {
  const response = await axios.get(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
  );
  return response.data.genres;
});

// Slice definition
const movieSlice = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
      state.currentPage = 1;
    },
    setGenreId: (state, action) => {
      state.genreId = action.payload;
      state.currentPage = 1;
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload;
      state.currentPage = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPopularMovies.fulfilled, (state, action) => {
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
      })
      .addCase(searchMovies.fulfilled, (state, action) => {
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchMoviesByGenre.fulfilled, (state, action) => {
        state.movies = action.payload.results;
        state.totalPages = action.payload.total_pages;
      })
      .addCase(fetchGenres.fulfilled, (state, action) => {
        state.genres = action.payload;
      });
  },
});

// Selectors
export const selectMovies = (state) => state.movie.movies;
export const selectMovieDetails = (state) => state.movie.movieDetails;
export const selectSearchQuery = (state) => state.movie.searchQuery;
export const selectGenreId = (state) => state.movie.genreId;
export const selectSortBy = (state) => state.movie.sortBy;
export const selectGenres = (state) => state.movie.genres;
export const selectCurrentPage = (state) => state.movie.currentPage;
export const selectTotalPages = (state) => state.movie.totalPages;

// Export actions and reducer
export const { setSearchQuery, setGenreId, setSortBy } = movieSlice.actions;
export default movieSlice.reducer;

// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// const apiKey = "2b2b15fa10d49065ed67fcaaa77f9afc";

// const sessionData = JSON.parse(localStorage.getItem("session"));
// const sessionId = sessionData ? sessionData.sessionId : null;
// const accountId = sessionData ? sessionData.accountId : null;

// const fetchPopularMoviesApi = async (page) => {
//   try {
//     const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${page}`;
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error fetching popular movies:", error);
//     throw error;
//   }
// };

// const fetchMovieDetailsApi = async (movieId) => {
//   try {
//     const apiUrl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
//     const response = await fetch(apiUrl);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error("Error fetching movie details:", error);
//     throw error;
//   }
// };

// const searchMoviesApi = async (query) => {
//   try {
//     const apiUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US&page=1`;
//     const options = {
//       method: "GET",
//       headers: {
//         accept: "application/json",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjJiMTVmYTEwZDQ5MDY1ZWQ2N2ZjYWFhNzdmOWFmYyIsIm5iZiI6MTcyMDE1OTk5OS43NDc5MjMsInN1YiI6IjY2ODYzZDZmMGEzZjg3YzRlYTVlYjdmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k9KkQVrueUK2PwvYTw4g52bcpJibyPCGGJfgXi1iUNE",
//       },
//     };

//     const response = await fetch(apiUrl, options);
//     if (!response.ok) {
//       throw new Error("Network response was not ok");
//     }
//     const data = await response.json();
//     return data.results;
//   } catch (error) {
//     console.error("Error searching movies:", error);
//     throw error;
//   }
// };

// // Async thunks
// export const fetchPopularMovies = createAsyncThunk(
//   "movie/fetchPopularMovies",
//   async (page) => {
//     return fetchPopularMoviesApi(page);
//   }
// );

// export const fetchMovieDetails = createAsyncThunk(
//   "movie/fetchMovieDetails",
//   async (movieId) => {
//     return fetchMovieDetailsApi(movieId);
//   }
// );
// export const onSearch = createAsyncThunk("movie/onSearch", async (query) => {
//   return searchMoviesApi(query);
// });

// // Initial state
// const initialState = {
//   movies: [],
//   movieDetails: null,
//   watchlist: [],
//   favorites: [],
//   searchQuery: "",
// };

// // Slice definition
// const movieSlice = createSlice({
//   name: "movie",
//   initialState,
//   reducers: {
//     setMovies: (state, action) => {
//       state.movies = action.payload;
//     },
//     setMovieDetails: (state, action) => {
//       state.movieDetails = action.payload;
//     },
//     setSearchQuery: (state, action) => {
//       state.searchQuery = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchPopularMovies.fulfilled, (state, action) => {
//         state.movies = action.payload;
//       })
//       .addCase(fetchMovieDetails.fulfilled, (state, action) => {
//         state.movieDetails = action.payload;
//       })

//       .addCase(onSearch.fulfilled, (state, action) => {
//         state.searchResults = action.payload;
//       });
//   },
// });

// // Selectors
// export const selectMovies = (state) => state.movie.movies;
// export const selectMovieDetails = (state) => state.movie.movieDetails;
// export const selectSearchQuery = (state) => state.movie.searchQuery;

// // Export actions and reducer
// export const { setMovies, setMovieDetails, setSearchQuery } =
//   movieSlice.actions;
// export default movieSlice.reducer;
// ///////////////////////////////////////////////////////
// // const addToWatchlistApi = async (movieId) => {
// //   try {
// //     const apiUrl = `https://api.themoviedb.org/3/account/${accountId}/watchlist?api_key=${apiKey}&session_id=${sessionId}`;
// //     const response = await fetch(apiUrl, {
// //       method: "POST",
// //       headers: {
// //         accept: "application/json",
// //         "content-type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         media_type: "movie",
// //         media_id: movieId,
// //         watchlist: true,
// //       }),
// //     });
// //     if (!response.ok) {
// //       throw new Error("Network response was not ok");
// //     }
// //     return response.json();
// //   } catch (error) {
// //     console.error("Error adding to watchlist:", error);
// //     throw error;
// //   }
// // };

// // const addToFavoritesApi = async (movieId) => {
// //   try {
// //     const apiUrl = `https://api.themoviedb.org/3/account/${accountId}/favorite?api_key=${apiKey}&session_id=${sessionId}`;
// //     const response = await fetch(apiUrl, {
// //       method: "POST",
// //       headers: {
// //         accept: "application/json",
// //         "content-type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         media_type: "movie",
// //         media_id: movieId,
// //         favorite: true,
// //       }),
// //     });
// //     if (!response.ok) {
// //       throw new Error("Network response was not ok");
// //     }
// //     return response.json();
// //   } catch (error) {
// //     console.error("Error adding to favorites:", error);
// //     throw error;
// //   }
// // };

// // const fetchWatchlistMoviesApi = async () => {
// //   try {
// //     const apiUrl = `https://api.themoviedb.org/3/account/${accountId}/watchlist/movies?api_key=${apiKey}&session_id=${sessionId}&language=en-US&page=1&sort_by=created_at.asc`;
// //     const response = await fetch(apiUrl);
// //     if (!response.ok) {
// //       throw new Error("Network response was not ok");
// //     }
// //     const data = await response.json();
// //     return data.results;
// //   } catch (error) {
// //     console.error("Error fetching watchlist movies:", error);
// //     throw error;
// //   }
// // };

// // const fetchFavoriteMoviesApi = async () => {
// //   try {
// //     const apiUrl = `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?api_key=${apiKey}&session_id=${sessionId}&language=en-US&page=1&sort_by=created_at.asc`;
// //     const response = await fetch(apiUrl);
// //     if (!response.ok) {
// //       throw new Error("Network response was not ok");
// //     }
// //     const data = await response.json();
// //     return data.results;
// //   } catch (error) {
// //     console.error("Error fetching favorite movies:", error);
// //     throw error;
// //   }
// // // };
// // export const addToWatchlist = createAsyncThunk(
// //   "movie/addToWatchlist",
// //   async (movieId) => {
// //     return addToWatchlistApi(movieId);
// //   }
// // );

// // export const addToFavorites = createAsyncThunk(
// //   "movie/addToFavorites",
// //   async (movieId) => {
// //     return addToFavoritesApi(movieId);
// //   }
// // );

// // export const fetchWatchlistMovies = createAsyncThunk(
// //   "movie/fetchWatchlistMovies",
// //   async () => {
// //     return fetchWatchlistMoviesApi();
// //   }
// // );

// // export const fetchFavoriteMovies = createAsyncThunk(
// //   "movie/fetchFavoriteMovies",
// //   async () => {
// //     return fetchFavoriteMoviesApi();
// //   }
// // );
// //.addCase(addToWatchlist.fulfilled, (state, action) => {
// //   state.watchlist.push(action.payload);
// // })
// // .addCase(addToFavorites.fulfilled, (state, action) => {
// //   state.favorites.push(action.payload);
// // })
// // .addCase(fetchWatchlistMovies.fulfilled, (state, action) => {
// //   state.watchlist = action.payload;
// // })
// // .addCase(fetchFavoriteMovies.fulfilled, (state, action) => {
// //   state.favorites = action.payload;
// // })
// //export const selectWatchlist = (state) => state.movie.watchlist;
// // export const selectFavorites = (state) => state.movie.favorites;
