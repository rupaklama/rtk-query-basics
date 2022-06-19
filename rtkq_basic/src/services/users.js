/* React-specific entry point that automatically generates
   hooks corresponding to the defined endpoints */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// createApi(): The core of RTK Query's functionality. It allows you to define a set of endpoints describe how to retrieve data from a series of endpoints, including configuration of how to fetch and transform that data. In most cases, you should use this once per app, with "one API slice per base URL" as a rule of thumb

// fetchBaseQuery(): A small wrapper around fetch that aims to simplify requests

// Define a service using a base URL and expected endpoints
// Start by importing createApi and defining an "API slice" that lists the server's
// base URL and which endpoints we want to interact with
export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://randomuser.me/",
  }),
  endpoints: builder => ({
    // endpoints
    getUsers: builder.query({
      query: () => "api",
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUsersQuery } = usersApi;
