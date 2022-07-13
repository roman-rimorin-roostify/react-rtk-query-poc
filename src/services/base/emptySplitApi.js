import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const emptySplitApi = createApi({
  baseQuery: fetchBaseQuery({
    // baseUrl: "https://jsonplaceholder.typicode.com"
    baseUrl: "/api",
    mode: "cors",
  }),
  endpoints: () => ({})
});
