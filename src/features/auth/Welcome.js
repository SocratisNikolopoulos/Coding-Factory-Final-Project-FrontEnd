/**
 * The Welcome component displays a personalized welcome message to the user.
 * - Uses the useAuth custom hook to retrieve user information like username, manager status, and admin status.
 * - Fetches the current date and formats it using Intl.DateTimeFormat.
 * - Renders a section displaying the current date, a personalized welcome message, and various links based on user roles.
 * - Provides links for viewing techNotes and adding new techNotes to all users.
 * - Displays additional links for managing users if the user is a manager or admin.
 */

import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Welcome = () => {
  const { username, isManager, isAdmin } = useAuth();

  const date = new Date();
  const today = new Intl.DateTimeFormat("en-US", { dateStyle: "full", timeStyle: "long" }).format(date);

  const content = (
    <section className="welcome">
      <p>{today}</p>

      <h1>Welcome {username}!</h1>

      <p>
        <Link to="/dash/notes">View techNotes</Link>
      </p>

      <p>
        <Link to="/dash/notes/new">Add New techNote</Link>
      </p>

      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users">View User Settings</Link>
        </p>
      )}

      {(isManager || isAdmin) && (
        <p>
          <Link to="/dash/users/new">Add New User</Link>
        </p>
      )}
    </section>
  );

  return content;
};
export default Welcome;
