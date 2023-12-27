/**
 * The Prefetch component is responsible for prefetching data from API endpoints on initial load.
 * - Utilizes Redux store to dispatch prefetch actions for notes and users using their respective API slices.
 * - Executes the prefetch actions for fetching notes and users' data with the 'force' option set to true.
 * - Renders child components using React Router's `Outlet` to display content based on the route hierarchy.
 */

import { store } from "../../app/store";
import { notesApiSlice } from "../notes/notesApiSlice";
import { usersApiSlice } from "../users/usersApiSlice";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

const Prefetch = () => {
  useEffect(() => {
    store.dispatch(notesApiSlice.util.prefetch("getNotes", "notesList", { force: true }));
    store.dispatch(usersApiSlice.util.prefetch("getUsers", "usersList", { force: true }));
  }, []);

  return <Outlet />;
};
export default Prefetch;
