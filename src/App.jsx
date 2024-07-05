import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetail";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React, { useEffect } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPopularMovies } from "./slice/movieSlice";
// import Header from "./components/Header";
// import MovieList from "./components/MovieList";
// import MovieDetails from "./components/MovieDetail";
// //import Login from "./components/Login";
// import "./index.css";

// import { onSearch } from "./slice/movieSlice";
// const App = () => {
//   return (
//     <Router>
//       <div className="container mx-auto p-4">
//         <Header />
//         <Routes>
//           <Route path="/" element={<MovieList />} />

//           <Route path="/movie/:id" element={<MovieDetails />} />
//           {/* <Route path="/login" element={<Login />} /> */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// export default App;

// // import React, { useEffect, useState } from "react";
// // import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// // import MovieCard from "./Component/MovieCard";
// // import MovieDetails from "./Component/MovieDetail";
// // import Header from "./Component/Header";
// // import { fetchPopularMovies, fetchMovieDetails } from "./API/api";
// // import ReactPaginate from "react-paginate";

// // const App = () => {
// //   const [movies, setMovies] = useState([]);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);

// //   useEffect(() => {
// //     fetchMovies(currentPage);
// //   }, [currentPage]);

// //   const fetchMovies = async (page) => {
// //     try {
// //       const data = await fetchPopularMovies(page);
// //       setMovies(data.results);
// //       setTotalPages(data.total_pages);
// //     } catch (error) {
// //       console.error("Error fetching data:", error);
// //     }
// //   };

// //   const handlePageClick = (data) => {
// //     setCurrentPage(data.selected + 1);
// //   };

// //   return (
// //     <Router>
// //       <div className="container mx-auto p-4">
// //         <Header />
// //         <Routes>
// //           <Route
// //             path="/"
// //             element={
// //               <div>
// //                 <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
// //                   {movies.map((movie, index) => (
// //                     <MovieCard key={index} movie={movie} />
// //                   ))}
// //                 </div>
// //                 <div className="mt-4 flex justify-center">
// //                   <ReactPaginate
// //                     previousLabel={"Previous"}
// //                     nextLabel={"Next"}
// //                     breakLabel={"..."}
// //                     breakClassName={"break-me"}
// //                     pageCount={totalPages}
// //                     marginPagesDisplayed={2}
// //                     pageRangeDisplayed={5}
// //                     onPageChange={handlePageClick}
// //                     containerClassName={"pagination flex space-x-2"}
// //                     pageClassName="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200"
// //                     activeClassName="bg-blue-500 text-white"
// //                     previousClassName="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200"
// //                     nextClassName="px-2 py-1 border border-gray-300 rounded hover:bg-gray-200"
// //                   />
// //                 </div>
// //               </div>
// //             }
// //           />

// //           <Route
// //             path="/movie/:id"
// //             element={<MovieDetails fetchMovieDetails={fetchMovieDetails} />}
// //           />
// //         </Routes>
// //       </div>
// //     </Router>
// //   );
// // };

// // export default App;
