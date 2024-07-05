import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  const { id, title, release_date, poster_path } = movie;
  const [rating, setRating] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const fetchMovieDetails = async () => {
    try {
      const apiKey = "2b2b15fa10d49065ed67fcaaa77f9afc";
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits,videos`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setRating(data.vote_average); // Assuming TMDB returns the rating as vote_average
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching movie details:", error);
      setIsLoading(false);
    }
  };

  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white flex flex-col">
      <Link to={`/movie/${id}`} className="flex flex-col h-full">
        <img className="w-full h-65 object-cover" src={posterUrl} alt={title} />
        <div className="px-6 py-4 flex-1">
          <div className="font-bold text-xl mb-2">
            {title} <br />({release_date ? release_date.split("-")[0] : ""})
          </div>
        </div>
        <div className="px-6 py-4 flex items-center">
          {!isLoading && (
            <div className="flex items-center space-x-1 font-bold text-xl">
              Rating : &nbsp;
              <span className="text-yellow-500 font-bold text-xl">
                ★ {/* Displaying a single golden star */}
              </span>
              <span className="text-lg font-semibold">{rating.toFixed(1)}</span>
            </div>
          )}
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const MovieCard = ({ movie }) => {
//   const { id, title, release_date, poster_path } = movie;
//   const [rating, setRating] = useState(0);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchMovieDetails();
//   }, []);

//   const handleViewDetails = () => {
//     fetch(
//       `https://api.themoviedb.org/3/movie/${movie.id}?api_key=2b2b15fa10d49065ed67fcaaa77f9afc&language=en-US`
//     )
//       .then((response) => {
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         return response.json();
//       })
//       .then((data) => {
//         console.log(data);
//         // onShowDetails(data); // Pass data to parent component for handling
//       })
//       .catch((error) => console.error("Error fetching movie details:", error));
//   };

//   const fetchMovieDetails = async () => {
//     try {
//       const apiKey = "2b2b15fa10d49065ed67fcaaa77f9afc";
//       const response = await fetch(
//         `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&append_to_response=credits,videos`
//       );
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       const data = await response.json();
//       setRating(data.vote_average); // Assuming TMDB returns the rating as vote_average
//       setIsLoading(false);
//     } catch (error) {
//       console.error("Error fetching movie details:", error);
//       setIsLoading(false);
//     }
//   };

//   const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

//   return (
//     <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white flex flex-col">
//       <Link to={`/movie/${id}`} className="flex flex-col h-full">
//         <img className="w-full h-70 object-cover" src={posterUrl} alt={title} />
//         <div className="px-6 py-4 flex-1">
//           <div className="font-bold text-xl mb-2">
//             {title} <br />({release_date ? release_date.split("-")[0] : ""})
//           </div>
//         </div>
//         <div className="px-6 py-4 flex items-center">
//           {!isLoading && (
//             <div className="flex items-center space-x-1 font-bold text-xl">
//               Rating : &nbsp;
//               <span className="text-yellow-500 font-bold text-xl">
//                 ★ {/* Displaying a single golden star */}
//               </span>
//               <span className="text-lg font-semibold">{rating.toFixed(1)}</span>
//             </div>
//           )}
//         </div>
//         <div className="px-6 py-4">
//           <button
//             onClick={handleViewDetails}
//             className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end" // Align to bottom-right
//           >
//             View Details
//           </button>
//         </div>
//       </Link>
//     </div>
//   );
// };

// export default MovieCard;

// // import React from "react";
// // //import "./index.css";
// // import { Link } from "react-router-dom";
// // import { useDispatch } from "react-redux";
// // //import { addToWishlist, addToFavorites } from "../slice/movieSlice";

// // const MovieCard = ({ movie }) => {
// //   const { id, title, release_date, poster_path } = movie;
// //   const dispatch = useDispatch();
// //   const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

// // const handleViewDetails = () => {
// //   fetch(
// //     `https://api.themoviedb.org/3/movie/${movie.id}?api_key=2b2b15fa10d49065ed67fcaaa77f9afc&language=en-US`
// //   )
// //     .then((response) => {
// //       if (!response.ok) {
// //         throw new Error("Network response was not ok");
// //       }
// //       return response.json();
// //     })
// //     .then((data) => {
// //       console.log(data);
// //       // onShowDetails(data); // Pass data to parent component for handling
// //     })
// //     .catch((error) => console.error("Error fetching movie details:", error));
// // };

// //   return (
// //     <div className="max-w-xs rounded overflow-hidden shadow-lg m-4 bg-white flex flex-col">
// //       <Link to={`/movie/${id}`} className="flex flex-col h-full">
// //         <img className="w-full h-64 object-cover" src={posterUrl} alt={title} />
// //         <div className="px-6 py-4 flex-1">
// //           <div className="font-bold text-xl mb-2">
// //             {title} <br />({release_date ? release_date.split("-")[0] : ""})
// //           </div>
// //         </div>
// //         <div className="px-6 py-4">
// //           <button
// //             onClick={handleViewDetails}
// //             className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded self-end" // Align to bottom-right
// //           >
// //             View Details
// //           </button>
// //         </div>
// //       </Link>
// //     </div>
// //   );
// // };

// // export default MovieCard;
