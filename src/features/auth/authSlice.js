/**
 * The authSlice creates a Redux slice named "auth" handling user authentication.
 * - Initializes the state with a token set to null.
 * - Provides reducer functions:
 *    - setCredentials: Updates the token in the state with the received accessToken from the action payload.
 *    - logOut: Clears the token in the state upon dispatch.
 * - Exports actions: setCredentials, logOut for updating the token or performing logout.
 * - Defines a reducer managing the state changes based on dispatched actions.
 * - Provides a selector function, selectCurrentToken, to retrieve the current token from the state.
 */

import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: { token: null },
  reducers: {
    setCredentials: (state, action) => {
      const { accessToken } = action.payload;
      state.token = accessToken;
    },
    logOut: (state, action) => {
      state.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state) => state.auth.token;
