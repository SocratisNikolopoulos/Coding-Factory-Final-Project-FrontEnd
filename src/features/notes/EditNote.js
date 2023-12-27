/**
 * The EditNote component manages the editing of a specific note.
 * - Utilizes useParams to retrieve the note ID from the URL parameters.
 * - Fetches the authenticated user's information using useAuth hook.
 * - Retrieves the note data and user list using useGetNotesQuery and useGetUsersQuery respectively from notesApiSlice and usersApiSlice.
 * - Renders a PulseLoader while fetching data and returns an error message if the note or users' data isn't available.
 * - Validates user access based on roles; regular users can only edit their own notes, while managers and admins have broader access.
 * - Displays an error message if the user doesn't have permission to edit the specific note.
 * - Renders the EditNoteForm component, passing the note and users' data as props for editing.
 */

import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import { useGetNotesQuery } from "./notesApiSlice";
import { useGetUsersQuery } from "../users/usersApiSlice";
import useAuth from "../../hooks/useAuth";
import PulseLoader from "react-spinners/PulseLoader";
import useTitle from "../../hooks/useTitle";

const EditNote = () => {
  useTitle("techNotes: Edit Note");

  const { id } = useParams();

  const { username, isManager, isAdmin } = useAuth();

  const { note } = useGetNotesQuery("notesList", {
    selectFromResult: ({ data }) => ({
      note: data?.entities[id],
    }),
  });

  const { users } = useGetUsersQuery("usersList", {
    selectFromResult: ({ data }) => ({
      users: data?.ids.map((id) => data?.entities[id]),
    }),
  });

  if (!note || !users?.length) return <PulseLoader color={"#FFF"} />;

  if (!isManager && !isAdmin) {
    if (note.username !== username) {
      return <p className="errmsg">No access</p>;
    }
  }

  const content = <EditNoteForm note={note} users={users} />;

  return content;
};
export default EditNote;
