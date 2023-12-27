/**
 * The RequireAuth component is used to enforce authentication and authorization based on allowed roles.
 * - Utilizes React Router's `useLocation` to capture the current route location.
 * - Fetches user roles using the custom hook `useAuth`.
 * - Renders child components through `Outlet` if the user's roles match any of the allowed roles.
 * - Redirects unauthorized users to the login page and passes the current location as state.
 */

import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const location = useLocation();
  const { roles } = useAuth();

  const content = roles.some((role) => allowedRoles.includes(role)) ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;

  return content;
};
export default RequireAuth;
