// import React, { useState, useEffect } from "react";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.search);
//     const requestToken = params.get("request_token");
//     if (requestToken) {
//       createSession(requestToken);
//     }
//   }, []);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const requestToken = await createRequestToken();
//       const authUrl = `https://www.themoviedb.org/authenticate/${requestToken}`;
//       window.location.href = authUrl;
//     } catch (error) {
//       setError("Failed to initiate login process");
//       console.error("Error creating request token:", error);
//     }
//   };

//   const createRequestToken = async () => {
//     try {
//       const apiKey = "2b2b15fa10d49065ed67fcaaa77f9afc";
//       const response = await fetch(
//         `https://api.themoviedb.org/3/authentication/token/new?api_key=${apiKey}`,
//         {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Accept: "application/json",
//           },
//         }
//       );
//       const data = await response.json();
//       return data.request_token;
//     } catch (error) {
//       throw new Error("Failed to create request token");
//     }
//   };

//   const createSession = async (requestToken) => {
//     try {
//       const apiKey = "2b2b15fa10d49065ed67fcaaa77f9afc";
//       const response = await fetch(
//         `https://api.themoviedb.org/3/authentication/session/new?api_key=${apiKey}`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ request_token: requestToken }),
//         }
//       );
//       const data = await response.json();
//       const sessionId = data.session_id;
//       const accountId = await fetchAccountId(sessionId);
//       console.log("Session ID:", sessionId);
//       console.log("Account ID:", accountId);

//       // Store session and account IDs in localStorage or state as needed
//       localStorage.setItem("session", JSON.stringify({ sessionId, accountId }));

//       // Redirect to home page ("/")
//       window.location.href = "/";
//     } catch (error) {
//       console.error("Error creating session:", error);
//     }
//   };

//   const fetchAccountId = async (sessionId) => {
//     try {
//       const apiKey = "2b2b15fa10d49065ed67fcaaa77f9afc";
//       const response = await fetch(
//         `https://api.themoviedb.org/3/account?session_id=${sessionId}&api_key=${apiKey}`
//       );
//       const data = await response.json();
//       return data.id;
//     } catch (error) {
//       console.error("Error fetching account ID:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto mt-8">
//       <h2 className="text-2xl font-bold mb-4">Login to Movie Master 🎥</h2>
//       {error && <p className="text-red-500 mb-4">{error}</p>}
//       <form onSubmit={handleLogin}>
//         <div className="mb-4">
//           <label
//             htmlFor="username"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Username
//           </label>
//           <input
//             type="text"
//             id="username"
//             className="mt-1 p-2 border rounded w-full"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="password"
//             className="block text-sm font-medium text-gray-700"
//           >
//             Password
//           </label>
//           <input
//             type="password"
//             id="password"
//             className="mt-1 p-2 border rounded w-full"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
//         >
//           Login with TMDb
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;
