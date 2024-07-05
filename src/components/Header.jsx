import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setSearchQuery,
  setGenreId,
  setSortBy,
  fetchPopularMovies,
  searchMovies,
  fetchMoviesByGenre,
  selectGenres,
  selectGenreId,
  fetchGenres,
  selectSortBy,
} from "../slice/movieSlice";
import axios from "axios";

const Header = () => {
  const [searchQuery, setSearchQueryLocal] = useState("");
  const dispatch = useDispatch();
  const genres = useSelector(selectGenres);
  const selectedGenreId = useSelector(selectGenreId);
  const selectedSortBy = useSelector(selectSortBy);

  useEffect(() => {
    dispatch(fetchGenres());
  }, [dispatch]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim() !== "") {
      dispatch(setSearchQuery(searchQuery));
      dispatch(searchMovies({ query: searchQuery, page: 1 }));
    } else {
      dispatch(fetchPopularMovies(1));
    }
  };

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    dispatch(setSortBy(sortBy));
    if (selectedGenreId || !selectedGenreId) {
      dispatch(
        fetchMoviesByGenre({ genreId: selectedGenreId, sortBy, page: 1 })
      );
    } else {
      dispatch(fetchPopularMovies(1));
    }
  };

  const handleGenreChange = (e) => {
    const genreId = e.target.value;
    dispatch(setGenreId(genreId));
    if (genreId) {
      dispatch(
        fetchMoviesByGenre({ genreId, sortBy: selectedSortBy, page: 1 })
      );
    } else {
      dispatch(fetchPopularMovies(1));
    }
  };

  return (
    <header className="bg-orange-900 p-4 mx-2 my-2 rounded-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">Movie Master 🎥</h1>
        <div className="flex space-x-4">
          <select
            value={selectedSortBy}
            onChange={handleSortChange}
            className="bg-white rounded-lg px-4 py-2 focus:outline-none font-bold"
          >
            <option value="popularity.desc">Popularity Descending</option>
            <option value="popularity.asc">Popularity Ascending</option>
            <option value="vote_average.desc">Rating Descending</option>
            <option value="vote_average.asc">Rating Ascending</option>
            <option value="release_date.desc">Release Date Descending</option>
            <option value="release_date.asc">Release Date Ascending</option>
          </select>
          <select
            value={selectedGenreId}
            onChange={handleGenreChange}
            className="bg-white rounded-lg px-4 py-2 focus:outline-none font-bold"
          >
            <option value="">All Genres</option>
            {genres.map((genre) => (
              <option key={genre.id} value={genre.id}>
                {genre.name}
              </option>
            ))}
          </select>
          <form onSubmit={handleSearchSubmit} className="flex">
            <input
              type="text"
              className="px-4 py-2 rounded-l focus:outline-none"
              placeholder="Search for a Movie..."
              value={searchQuery}
              onChange={(e) => setSearchQueryLocal(e.target.value)}
            />
            <button
              type="submit"
              className="bg-orange-100 text-orange-900 px-4 py-2 rounded-r-lg hover:bg-gray-200 font-bold"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </header>
  );
};

export default Header;

// import React, { useState, useEffect } from "react";
// import { useDispatch } from "react-redux";
// import { onSearch, setSearchQuery } from "../slice/movieSlice";

// const Header = () => {
//   const [searchQuery, setSearchQueryLocal] = useState("");
//   const [genres, setGenres] = useState([]);
//   const [sortBy, setSortBy] = useState("popularity.desc"); // Default sort option
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchGenres = async () => {
//       try {
//         const apiKey = "2b2b15fa10d49065ed67fcaaa77f9afc";
//         const options = {
//           method: "GET",
//           headers: {
//             accept: "application/json",
//             Authorization:
//               "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjJiMTVmYTEwZDQ5MDY1ZWQ2N2ZjYWFhNzdmOWFmYyIsIm5iZiI6MTcyMDE1OTk5OS43NDc5MjMsInN1YiI6IjY2ODYzZDZmMGEzZjg3YzRlYTVlYjdmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k9KkQVrueUK2PwvYTw4g52bcpJibyPCGGJfgXi1iUNE",
//           },
//         };
//         const response = await fetch(
//           "https://api.themoviedb.org/3/genre/movie/list?language=en",
//           options
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const data = await response.json();
//         setGenres(data.genres);
//       } catch (error) {
//         console.error("Error fetching genres:", error);
//       }
//     };

//     fetchGenres();
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     dispatch(setSearchQuery(searchQuery));
//   };

//   const handleSortChange = (e) => {
//     setSortBy(e.target.value);
//     // Optionally, you can dispatch an action here to handle sorting in Redux state
//   };

//   return (
//     <header className="bg-orange-900 p-4 rounded-lg">
//       <div className="container mx-auto flex items-center justify-between">
//         <h1 className="text-white text-2xl font-bold">Movie Master 🎥 </h1>

//         <div className="relative ml-4">
//           <select
//             value={sortBy}
//             onChange={handleSortChange}
//             className="bg-white rounded-lg px-4 py-2 focus:outline-none font-bold"
//           >
//             <option value="popularity.desc">Popularity Descending</option>
//             <option value="popularity.asc">Popularity Ascending</option>
//             <option value="vote_average.desc">Rating Descending</option>
//             <option value="vote_average.asc">Rating Ascending</option>
//             <option value="release_date.desc">Release Date Descending</option>
//             <option value="release_date.asc">Release Date Ascending</option>
//           </select>
//         </div>
//         <div className="relative ml-4">
//           <select className="bg-white rounded-lg px-4 py-2 focus:outline-none font-bold">
//             <option value="">All Genres</option>
//             {genres.map((genre) => (
//               <option key={genre.id} value={genre.id}>
//                 {genre.name}
//               </option>
//             ))}
//           </select>
//         </div>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             className="px-4 py-2 rounded-l- focus:outline-none"
//             placeholder="Search for a Movie..."
//             value={searchQuery}
//             onChange={(e) => setSearchQueryLocal(e.target.value)}
//           />
//           <button
//             type="submit"
//             className="bg-orange-100 text-orange-900 px-4 py-2 rounded-r-lg hover:bg-gray-200 font-bold"
//           >
//             Search
//           </button>
//         </form>
//       </div>
//     </header>
//   );
// };

// export default Header;
