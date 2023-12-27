/**
 * This module manages notes data by integrating with an API using Redux Toolkit's API slice.
 * It employs an entity adapter to handle note entities, defines CRUD endpoints, and creates
 * selectors to access and manipulate normalized notes data from the Redux store.
 * - notesAdapter: Entity adapter for notes with custom sorting based on completion status.
 * - initialState: Initial state for the notes adapter.
 * - notesApiSlice: Defines API endpoints for fetching, adding, updating, and deleting notes.
 * - Selectors: Extracts and creates memoized selectors for accessing notes from the Redux store.
 *   - selectNotesResult: Selector to retrieve the query result object for notes.
 *   - selectNotesData: Memoized selector to access normalized notes data from the store.
 *   - selectAllNotes, selectNoteById, selectNoteIds: Selectors created using getSelectors for notes data.
 *     These selectors allow accessing notes by ID, retrieving all notes, and retrieving note IDs.
 */

import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "../../app/api/apiSlice";

const notesAdapter = createEntityAdapter({
  sortComparer: (a, b) => (a.completed === b.completed ? 0 : a.completed ? 1 : -1),
});

const initialState = notesAdapter.getInitialState();

export const notesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotes: builder.query({
      query: () => ({
        url: "/notes",
        validateStatus: (response, result) => {
          return response.status === 200 && !result.isError;
        },
      }),
      transformResponse: (responseData) => {
        const loadedNotes = responseData.map((note) => {
          note.id = note._id;
          return note;
        });
        return notesAdapter.setAll(initialState, loadedNotes);
      },
      providesTags: (result, error, arg) => {
        if (result?.ids) {
          return [{ type: "Note", id: "LIST" }, ...result.ids.map((id) => ({ type: "Note", id }))];
        } else return [{ type: "Note", id: "LIST" }];
      },
    }),
    addNewNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "POST",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: [{ type: "Note", id: "LIST" }],
    }),
    updateNote: builder.mutation({
      query: (initialNote) => ({
        url: "/notes",
        method: "PATCH",
        body: {
          ...initialNote,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
    deleteNote: builder.mutation({
      query: ({ id }) => ({
        url: `/notes`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Note", id: arg.id }],
    }),
  }),
});

export const { useGetNotesQuery, useAddNewNoteMutation, useUpdateNoteMutation, useDeleteNoteMutation } = notesApiSlice;

// returns the query result object
export const selectNotesResult = notesApiSlice.endpoints.getNotes.select();

// creates memoized selector
const selectNotesData = createSelector(
  selectNotesResult,
  (notesResult) => notesResult.data // normalized state object with ids & entities
);

//getSelectors creates these selectors and we rename them with aliases using destructuring
export const {
  selectAll: selectAllNotes,
  selectById: selectNoteById,
  selectIds: selectNoteIds,
  // Pass in a selector that returns the notes slice of state
} = notesAdapter.getSelectors((state) => selectNotesData(state) ?? initialState);
