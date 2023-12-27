/**
 * Users API Slice and Selectors
 *
 * This module handles API calls and state management for user data using Redux Toolkit's createEntityAdapter,
 * along with defining API endpoints for getting, adding, updating, and deleting users.
 *
 * External Dependencies:
 * - createSelector: Function from '@reduxjs/toolkit' for creating memoized selectors
 * - createEntityAdapter: Function from '@reduxjs/toolkit' for managing normalized entity state
 * - apiSlice: Slice from '../../app/api/apiSlice' containing functionality for API interactions
 *
 * Features:
 * - usersAdapter: Entity adapter managing user entities and their relationships
 * - initialState: Initial state managed by the users adapter
 *
 * Endpoints:
 * - getUsers: Endpoint for fetching users' data
 * - addNewUser: Endpoint for adding a new user
 * - updateUser: Endpoint for updating user data
 * - deleteUser: Endpoint for deleting a user
 *
 * Selectors:
 * - selectUsersResult: Selector returning the query result object for users
 * - selectUsersData: Memoized selector extracting normalized user data from the result object
 * - selectAllUsers: Selector returning an array of all users
 * - selectUserById: Selector returning a user by ID
 * - selectUserIds: Selector returning an array of user IDs
 *
 */

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const usersAdapter = createEntityAdapter({});

const initialState = usersAdapter.getInitialState();

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/users",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedUsers = responseData.map((user) => {
          user.id = user._id;
          return user;
        });
        return usersAdapter.setAll(initialState, loadedUsers);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [{ type: "User", id: "LIST" }, ...result.ids.map((id) => ({ type: "User", id }))];
        } else return [{ type: "User", id: "LIST" }];
      },
    }),
    addNewUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "POST",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),
    updateUser: builder.mutation({
      query: (initialUserData) => ({
        url: "/users",
        method: "PATCH",
        body: {
          ...initialUserData,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `/users`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "User", id: arg.id }],
    }),
  }),
});

export const { useGetUsersQuery, useAddNewUserMutation, useUpdateUserMutation, useDeleteUserMutation } = usersApiSlice;

// returns the query result object
export const selectUsersResult = usersApiSlice.endpoints.getUsers.select();

// creates memoized selector
const selectUsersData = createSelector(
  selectUsersResult,
  (usersResult) => usersResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllUsers,
  selectById: selectUserById,
  selectIds: selectUserIds,
  // Pass in a selector that returns the users slice of state
} = usersAdapter.getSelectors((state) => selectUsersData(state) ?? initialState);
