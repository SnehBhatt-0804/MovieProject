import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails, selectMovieDetails } from "../slice/movieSlice";
import axios from "axios";

const MovieDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const movie = useSelector(selectMovieDetails);

  const [rating, setRating] = useState(0); // State to store the rating value
  const [isRatingSubmitted, setIsRatingSubmitted] = useState(false); // State to track if rating is submitted

  useEffect(() => {
    dispatch(fetchMovieDetails(id));
  }, [dispatch, id]);

  const handleRatingChange = (newRating) => {
    setRating(newRating); // Update rating state based on user selection
  };

  const handleRateMovie = async () => {
    const apiKey = "2b2b15fa10d49065ed67fcaaa77f9afc";

    const requestBody = {
      value: rating,
    };

    const headers = {
      "Content-Type": "application/json;charset=utf-8",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYjJiMTVmYTEwZDQ5MDY1ZWQ2N2ZjYWFhNzdmOWFmYyIsIm5iZiI6MTcyMDE1OTk5OS43NDc5MjMsInN1YiI6IjY2ODYzZDZmMGEzZjg3YzRlYTVlYjdmYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.k9KkQVrueUK2PwvYTw4g52bcpJibyPCGGJfgXi1iUNE",
    };

    try {
      const response = await axios.post(
        `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}`,
        requestBody,
        { headers }
      );

      if (response.status === 201) {
        setIsRatingSubmitted(true);

        dispatch(fetchMovieDetails(id));
      } else {
        alert("Failed to submit rating:", response.statusText);
      }
    } catch (error) {
      alert("Error submitting rating:", error);
    }
  };

  if (!movie) {
    return null;
  }

  const { title, release_date, overview, poster_path } = movie;
  const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <div className="container mx-auto mt-8">
      <div className=" bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">{title}</h2>
          <div></div>
        </div>
        <div className="flex mb-4">
          <img
            className="w-40 h-60 mr-4 object-cover"
            src={posterUrl}
            alt={title}
          />
          <div>
            <p className="text-gray-700 mb-2">
              <strong>Release Date:</strong> {release_date}
            </p>
            <p className="text-gray-700 mb-4">
              <strong>Overview:</strong> {overview}
            </p>
            <div className="flex items-center mb-4">
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700 mr-2"
              >
                Rate this movie:
              </label>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
                <button
                  key={star}
                  onClick={() => handleRatingChange(star)}
                  className={`${
                    star <= rating ? "text-yellow-500" : "text-gray-300"
                  } hover:text-yellow-500 focus:outline-none text-xl`}
                >
                  ★
                </button>
              ))}
              <button
                onClick={handleRateMovie}
                className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Submit Rating
              </button>
            </div>
            {isRatingSubmitted && (
              <p className="text-green-500">Rating submitted successfully!</p>
            )}
            <div>
              <button
                onClick={() => navigate("/")}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              >
                Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchMovieDetails, selectMovieDetails } from "../slice/movieSlice";

// const MovieDetails = () => {
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const movie = useSelector(selectMovieDetails);

//   const [rating, setRating] = useState(0); // State to store the rating value
//   const [isRatingSubmitted, setIsRatingSubmitted] = useState(false); // State to track if rating is submitted

//   useEffect(() => {
//     dispatch(fetchMovieDetails(id));
//   }, [dispatch, id]);

//   const handleRatingChange = (newRating) => {
//     setRating(newRating); // Update rating state based on user selection
//   };

//   const handleRateMovie = async () => {
//     const apiKey = "2b2b15fa10d49065ed67fcaaa77f9afc";

//     const options = {
//       method: "POST",
//       headers: {
//         accept: "application/json",
//         "Content-Type": "application/json;charset=utf-8",
//       },
//       body: JSON.stringify({
//         value: rating,
//       }),
//     };

//     try {
//       const response = await fetch(
//         `https://api.themoviedb.org/3/movie/${id}/rating?api_key=${apiKey}`,
//         options
//       );
//       if (response.ok) {
//         setIsRatingSubmitted(true); // Set state to indicate successful submission
//         // Additional actions after successful rating submission can be added here
//         console.log("Rating submitted successfully");
//       } else {
//         console.error("Failed to submit rating:", response.statusText);
//         // Handle error scenario, e.g., display an error message
//       }
//     } catch (error) {
//       console.error("Error submitting rating:", error);
//       // Handle network or other errors
//     }
//   };

//   if (!movie) {
//     return null;
//   }

//   const { title, release_date, overview, poster_path } = movie;
//   const posterUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

//   return (
//     <div className="container mx-auto mt-8">
//       <div className=" bg-white rounded-lg shadow-lg p-6">
//         <div className="flex items-center justify-between mb-4">
//           <h2 className="text-2xl font-bold">{title}</h2>
//           <div></div>
//         </div>
//         <div className="flex mb-4">
//           <img
//             className="w-40 h-60 mr-4 object-cover"
//             src={posterUrl}
//             alt={title}
//           />
//           <div>
//             <p className="text-gray-700 mb-2">
//               <strong>Release Date:</strong> {release_date}
//             </p>
//             <p className="text-gray-700 mb-4">
//               <strong>Overview:</strong> {overview}
//             </p>
//             <div className="flex items-center mb-4">
//               <label
//                 htmlFor="rating"
//                 className="block text-sm font-medium text-gray-700 mr-2"
//               >
//                 Rate this movie:
//               </label>
//               {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((star) => (
//                 <button
//                   key={star}
//                   onClick={() => handleRatingChange(star)}
//                   className={`${
//                     star <= rating ? "text-yellow-500" : "text-gray-300"
//                   } hover:text-yellow-500 focus:outline-none text-xl`}
//                 >
//                   ★
//                 </button>
//               ))}
//               <button
//                 onClick={handleRateMovie}
//                 className="ml-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Submit Rating
//               </button>
//             </div>
//             {isRatingSubmitted && (
//               <p className="text-green-500">Rating submitted successfully!</p>
//             )}
//             <div>
//               <button
//                 onClick={() => navigate("/")}
//                 className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
//               >
//                 Back
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MovieDetails;
