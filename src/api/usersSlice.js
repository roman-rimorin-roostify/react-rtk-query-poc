import { createSelector, createEntityAdapter } from '@reduxjs/toolkit'
import { sub } from 'date-fns'
import { apiSlice } from "./base/apiSlice";

const url = 'users'

const usersAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.date.localeCompare(a.date)
})

const initialState = usersAdapter.getInitialState()

export const usersApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => `${url}`,
      transformResponse: res => {
        const loadedUsers =  res.map(user => {
          let min = 1;
          if(!user?.date) user.date = sub(new Date(), { minutes: min++ }).toISOString()
          return user
        })

        // set the new state to the adapter
        return usersAdapter.setAll(initialState, loadedUsers) // normalized our data
      },
      // If anyone of those user id's are invalidated 
      // we will also refetch our list automatically 
      // because this is invalidated
      providesTags: (result, error, arg) => {
        return [
        // identifying as list as type user.
        // everytime we invalidate this tag we reperform/re-autofetch the user again 
        // if we want to get the full list again we just invalidate the list id
        { type: 'User', id: 'LIST' }, 
        // what we are doing now is we are providing an object for each separate individual user
        // passing the id from the user, by mapping over the result and also spreading it into individual user id
        ...result.ids.map(id => ({type: 'User', id}))
      ]}
    }),
    getUsersById: builder.query({
      query: id => `${url}/?id=${id}`,
      transformResponse: res => {
        const loadedUsers =  res.map(user => {
          let min = 1;
          if(!user?.date) user.date = sub(new Date(), { minutes: min++ }).toISOString()
          return user
        })

        // set the new state to the adapter
        return usersAdapter.setAll(initialState, loadedUsers) // normalized our data and cache state
      },
      // If anyone of those user id's are invalidated 
      // we will also refetch our list automatically 
      // because this is invalidated
      providesTags: (result, error, arg) => {
        console.log(result)
        return [
          ...result.ids.map(id => ({type: 'User', id}))
        ]
      }
    }),
    addNewUser: builder.mutation({
      query: initialUser => ({
        url: `${url}`,
        method: 'POST',
        body: {
          ...initialUser,
          id: Number(initialUser.id),
          firstName: String(initialUser.firstName),
          lastName: String(initialUser.lastName),
          jerseyNumber: Number(initialUser.jerseyNumber),
          team: String(initialUser.team),
          isActive: Boolean(initialUser.isActive),
          date: new Date().toISOString()
        }
      }),
      invalidatesTags: [
        { type: 'User', id: 'LIST' } // invalidates the user list cache
      ]
    }),
    updateUser: builder.mutation({
      query: initialUser => ({
        url: `${url}/?id=${initialUser.id}`,
        method: 'PUT',
        body: {
          ...initialUser,
          date: new Date().toISOString()
        }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id}
      ]
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `${url}/?id=${id}`,
        method: 'DELETE',
        body: { id }
      }),
      invalidatesTags: (result, error, arg) => [
        { type: 'User', id: arg.id}
      ]
    })
  })
});

// from the query above,
// it creates a hook, a custom hook already from the methods we created
export const { 
  useGetUsersQuery,
  useGetUsersByIdQuery,
  useAddNewUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
  useLazyGetUsersQuery
} = usersApi;

// returns the query result object
export const selectUsersResult = usersApi.endpoints.getUsers.select()

// Creates memoized selector
// createSelector -> receives an input functions or functions that has an output
const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data // output -> // normalized state object with ids & entities
)

// getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
