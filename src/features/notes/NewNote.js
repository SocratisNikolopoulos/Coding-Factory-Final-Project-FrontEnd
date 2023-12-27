/**
 * The NewNote component renders a form for creating a new note.
 * - It utilizes the NewNoteForm component to handle note creation.
 * - Retrieves user data using the useGetUsersQuery hook from usersApiSlice to populate the users' dropdown.
 * - Displays a loading spinner while fetching user data.
 * - Once user data is available, renders the NewNoteForm component with the retrieved user information.
 * - Sets the title of the page using the useTitle hook to indicate the context of creating a new note.
 */

import NewNoteForm from "./NewNoteForm";
import { useGetUsersQuery } from "../users/usersApiSlice";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const NewNote = () => {
  useTitle("techNotes: New Note");

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!users?.length) return <PulseLoader color={"#FFF"} />;

  const content = <NewNoteForm users={users} />;

  return content;
};
export default NewNote;
