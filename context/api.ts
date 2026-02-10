import axios from "axios";
import { storage } from "@/context/storage";
import { router } from "expo-router";
import { Alert } from "react-native";

// Main axios instance for your API requests.
const api = axios.create({
  baseURL: "https://api.h3llcat.app/",
  headers: { "Content-Type": "application/json" },
});

// Request interceptor to add the access token.
api.interceptors.request.use(
  (request) => {
    const accessToken = storage.getString("accessToken");
    if (accessToken) {
      request.headers!["Authorization"] = `Bearer ${accessToken}`;
    }
    return request;
  },
  (error) => {
    // (rare) errors building the request itself
    // you can still redirect here if you really want
    router.replace("/login/sign-signature");
    return Promise.reject(error);
  }
);

// 2) **Response** interceptor: look for HTTP 401
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // optional: clear any stale tokens
      storage.delete("accessToken");
      // notify the user
      //  Alert.alert("Session expired", "Please sign in again.");
      // imperative navigation: replace avoids users going “back” into a broken session
      router.replace("/login/sign-signature");
    }
    return Promise.reject(error);
  }
);

// // A separate axios instance without interceptors for refreshing tokens.
// const refreshApi = axios.create({
//   baseURL: "https://api.h3llcat.app/",
//   headers: { "Content-Type": "application/json" },
// });

// // Flags and queue for managing refresh token calls.
// let isRefreshing = false;
// let refreshSubscribers: ((token: string) => void)[] = [];

// // Call all the subscribers once the token is refreshed.
// function onRefreshed(token: string) {
//   refreshSubscribers.forEach((callback) => callback(token));
//   refreshSubscribers = [];
// }

// function addRefreshSubscriber(callback: (token: string) => void) {
//   refreshSubscribers.push(callback);
// }

// // Response interceptor to handle 401 errors.
// api.interceptors.response.use(
//   (response) => response,
//   async (error) => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       // Mark the request as retried.
//       originalRequest._retry = true;

//       // If a refresh is already in progress, wait for it.
//       if (isRefreshing) {
//         return new Promise((resolve) => {
//           addRefreshSubscriber((token: string) => {
//             originalRequest.headers["Authorization"] = `Bearer ${token}`;
//             resolve(api(originalRequest));
//           });
//         });
//       }

//       isRefreshing = true;
//       const refreshToken = storage.getString("refreshToken");
//       const userId = storage.getString("userId");

//       try {
//         // Use the refreshApi instance to bypass interceptors.
//         const response = await refreshApi.post("/auth/refresh-token", {
//           refreshToken,
//           userId,
//         });

//         const { accessToken, refreshToken: newRefreshToken } = response.data;

//         // Store the new tokens.
//         storage.set("accessToken", accessToken);
//         storage.set("refreshToken", newRefreshToken);

//         // Update the default header for future requests.
//         api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
//         isRefreshing = false;
//         onRefreshed(accessToken);

//         // Retry the original request with the new token.
//         originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
//         return api(originalRequest);
//       } catch (refreshError) {
//         isRefreshing = false;
//         // If token refresh fails (refresh token expired), alert and redirect.
//         Alert.alert(
//           "Session Expired",
//           "Your session has expired. Please log in again.",
//           [
//             {
//               text: "OK",
//               onPress: () => {
//                 storage.delete("accessToken");
//                 storage.delete("refreshToken");
//                 storage.delete("userId");
//                 router.navigate("/login/sign-signature");
//               },
//             },
//           ]
//         );
//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error);
//   }
// );

export default api;
