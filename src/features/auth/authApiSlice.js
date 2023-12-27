/**
 * The authApiSlice integrates authentication-related endpoints into the API slice.
 * - Includes mutations for login, logout, and token refresh.
 * - Provides the login mutation for user authentication using credentials via a POST request to '/auth'.
 * - Offers a mutation to send a logout request via a POST request to '/auth/logout'. Upon query fulfillment, dispatches the logOut action to clear user authentication. Additionally, resets the API state after a brief timeout.
 * - Contains a refresh mutation for token renewal by making a GET request to '/auth/refresh'. After query fulfillment, updates the accessToken in the state with the received data.
 * - Provides hooks for using these mutations: useLoginMutation, useSendLogoutMutation, and useRefreshMutation.
 */

import { apiSlice } from "../../app/api/apiSlice";
import { logOut, setCredentials } from "./authSlice";

export const authApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    sendLogout: builder.mutation({
      query: () => ({
        url: "/auth/logout",
        method: "POST",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          dispatch(logOut());
          setTimeout(() => {
            dispatch(apiSlice.util.resetApiState());
          }, 1000);
        } catch (err) {
          console.log(err);
        }
      },
    }),
    refresh: builder.mutation({
      query: () => ({
        url: "/auth/refresh",
        method: "GET",
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          console.log(data);
          const { accessToken } = data;
          dispatch(setCredentials({ accessToken }));
        } catch (err) {
          console.log(err);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useSendLogoutMutation, useRefreshMutation } = authApiSlice;
