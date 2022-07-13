import { emptySplitApi } from "./base/emptySplitApi";

export const usersApi = emptySplitApi.injectEndpoints({
  reducerPath: "users",
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `users`
    })
  })
});

export const { useGetUsersQuery } = usersApi;
