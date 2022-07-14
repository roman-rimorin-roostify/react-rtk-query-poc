import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  baseQuery: fetchBaseQuery({
    //reducerPath: 'api', // optional because the default is 'api', you can name it whatever you want
    baseUrl: "/api",
    mode: "cors",
  }),
  endpoints: () => ({})
});
