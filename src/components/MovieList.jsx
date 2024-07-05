import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectMovies,
  fetchPopularMovies,
  searchMovies,
  fetchMoviesByGenre,
  selectSearchQuery,
  selectGenreId,
  selectSortBy,
  selectCurrentPage,
  selectTotalPages,
  selectGenres,
} from "../slice/movieSlice";
import MovieCard from "./MovieCard";
import ReactPaginate from "react-paginate";

const MovieList = () => {
  const dispatch = useDispatch();
  const movies = useSelector(selectMovies);
  const searchQuery = useSelector(selectSearchQuery);
  const genreId = useSelector(selectGenreId);
  const sortBy = useSelector(selectSortBy);
  const currentPage = useSelector(selectCurrentPage);
  const totalPages = useSelector(selectTotalPages);
  const genres = useSelector(selectGenres);

  useEffect(() => {
    if (searchQuery) {
      dispatch(searchMovies({ query: searchQuery, page: currentPage }));
    } else if (genreId) {
      dispatch(fetchMoviesByGenre({ genreId, sortBy, page: currentPage }));
    } else {
      dispatch(fetchPopularMovies(currentPage));
    }
  }, [dispatch, searchQuery, genreId, sortBy, currentPage]);

  const handlePageClick = ({ selected }) => {
    if (searchQuery) {
      dispatch(searchMovies({ query: searchQuery, page: selected + 1 }));
    } else if (genreId) {
      dispatch(fetchMoviesByGenre({ genreId, sortBy, page: selected + 1 }));
    } else {
      dispatch(fetchPopularMovies(selected + 1));
    }
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {movies.map((movie, index) => (
          <MovieCard key={index} movie={movie} />
        ))}
      </div>
      <div className="mt-4 flex justify-center">
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          breakClassName={"break-me"}
          pageCount={totalPages}
          marginPagesDisplayed={2}
          pageRangeDisplayed={5}
          onPageChange={handlePageClick}
          containerClassName={"pagination flex space-x-2"}
          pageClassName="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200"
          activeClassName="bg-blue-500 text-white"
          previousClassName="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200"
          nextClassName="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200"
        />
      </div>
    </div>
  );
};

export default MovieList;

// import React, { useEffect } from "react";
// //import "../";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   selectMovies,
//   fetchPopularMovies,
//   onSearch,
//   selectSearchQuery,
// } from "../slice/movieSlice";
// import MovieCard from "./MovieCard";
// import ReactPaginate from "react-paginate";

// const MovieList = () => {
//   const dispatch = useDispatch();
//   const movies = useSelector(selectMovies);

//   const searchQuery = useSelector(selectSearchQuery);
//   useEffect(() => {
//     dispatch(fetchPopularMovies(1));
//   }, [dispatch]);

//   const handlePageClick = ({ selected }) => {
//     if (searchQuery) {
//       dispatch(onSearch(searchQuery, selected + 1));
//     } else {
//       dispatch(fetchPopularMovies(selected + 1));
//     }
//   };

//   const handleSearch = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== "") {
//       dispatch(onSearch(searchQuery));
//     } else {
//       dispatch(fetchPopularMovies(1));
//     }
//   };

//   useEffect(() => {
//     if (searchQuery) {
//       dispatch(onSearch(searchQuery));
//     } else {
//       dispatch(fetchPopularMovies(1));
//     }
//   }, [dispatch, searchQuery]);

//   return (
//     <div>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
//         {movies.map((movie, index) => (
//           <MovieCard key={index} movie={movie} />
//         ))}
//       </div>
//       <div className="mt-4 flex justify-center">
//         <ReactPaginate
//           previousLabel={"Previous"}
//           nextLabel={"Next"}
//           breakLabel={"..."}
//           breakClassName={"break-me"}
//           pageCount={100}
//           marginPagesDisplayed={2}
//           pageRangeDisplayed={5}
//           onPageChange={handlePageClick}
//           containerClassName={"pagination flex space-x-2"}
//           pageClassName="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200"
//           activeClassName="bg-blue-500 text-white"
//           previousClassName="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200"
//           nextClassName="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200"
//         />
//       </div>
//     </div>
//   );
// };

// export default MovieList;
